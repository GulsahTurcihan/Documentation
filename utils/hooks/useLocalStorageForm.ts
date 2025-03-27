import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, Path, PathValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/utils/localStorageUtils";
import { z } from "zod";

type SchemaType = z.ZodTypeAny;

export const useLocalStorageForm = <T extends SchemaType>(
  key: Path<z.infer<T>>,
  schema: T
) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: {} as any, // TypeScript hatasını önlemek için
  });

  const { watch } = form;
  const formValues = watch();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (values: z.infer<T>) => {
      return new Promise<void>((resolve, reject) => {
        try {
          localStorage.setItem(key, JSON.stringify(values));
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
    onSuccess: () => {
      toast({ description: `${key} saved successfully!` });
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: () => {
      toast({
        description: `There was an error saving the ${key}.`,
      });
    },
  });

  const debouncedSaveToLocalStorage = useCallback(
    debounce((values: z.infer<T>) => {
      mutate(values);
    }, 300),
    [mutate]
  );

  useEffect(() => {
    debouncedSaveToLocalStorage(formValues);
  }, [formValues, debouncedSaveToLocalStorage]);

  const [cards, setCards] = useState<
    { id: number; value: string; isCollapsed: boolean }[]
  >([]);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setCards(JSON.parse(storedData));
    }
  }, [key]);

  const handleInputChange = useCallback(
    (id: number, newValue: string) => {
      setCards((prevCards) => {
        const updatedCards = prevCards.map((card) =>
          card.id === id ? { ...card, value: newValue } : card
        );
        form.setValue(
          key,
          updatedCards.map((card) => card.value) as PathValue<
            z.infer<T>,
            typeof key
          >
        );
        return updatedCards;
      });
    },
    [form, key]
  );

  const handleAddCard = useCallback(() => {
    const newCard = { id: Date.now(), value: "", isCollapsed: false };
    setCards((prevCards) => [...prevCards, newCard]);
  }, []);

  const handleRemoveCard = useCallback((id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  }, []);

  const toggleCollapseCard = useCallback((id: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isCollapsed: !card.isCollapsed } : card
      )
    );
  }, []);

  return {
    form,
    cards,
    handleInputChange,
    handleAddCard,
    handleRemoveCard,
    toggleCollapseCard,
  };
};
