"use client";

import React from "react";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/forms/FormComponents";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Control,
  FormProvider,
  useFormContext,
  useForm,
  set,
} from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { MediaTypes } from "@/utils/types";

function mapToSelectItems<T>(values: T[]): { label: string; value: T }[] {
  return values.map((value) => ({
    label: String(value), // Kullanıcıya gösterilecek metin
    value, // Formda kullanılacak gerçek değer
  }));
}

type ArrayOfStringFieldProps = {
  name: string;
  label: string;
  control?: Control<any>;
  className?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: (data: any) => void;
};

export const CreateMediaObject: React.FC<ArrayOfStringFieldProps> = ({
  name,
  label,
}) => {
  type Card = {
    id: number;
    isCollapsed: boolean;
    placement: number;
    mediaType: MediaTypes.image;
    url: string;
  };

  const { control, setValue } = useFormContext();
  const form = useForm();

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const cleanedVariant = cards.map(({ mediaType, url, placement }) => ({
      mediaType,
      url,
      placement,
    }));
    setValue(name, cleanedVariant, { shouldValidate: true });
  }, [cards, name, setValue]);

  // ✅ useEffect updates form value when `cards` changes

  useEffect(() => {
    setValue(name, cards.length > 0 ? cards : []); // ✅ Ensure it's always an array
  }, [cards, name, setValue]);

  // ✅ Add a new card

  const handleAddCard = useCallback(() => {
    setCards((prevCards) => [
      ...prevCards,
      {
        id: Date.now(),
        isCollapsed: false,
        placement: 1,
        mediaType: MediaTypes.image,
        url: "",
      },
    ]);
  }, []);

  // ✅ Remove card by id

  const handleRemoveCard = useCallback((id: number) => {
    {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }
  }, []);

  const toggleCollapseCard = useCallback((id: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isCollapsed: !card.isCollapsed } : card
      )
    );

    console.log("toggled card", id);
  }, []);

  const handleChange = (cardId: number, field: keyof Card, value: any) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    );
  };

  return (
    <FormProvider {...form}>
      <Button
        type="button"
        onClick={handleAddCard}
        className="w-full border mb-2 justify-between bg-white hover:border-sidebar-ring"
      >
        <span>ADD OBJECT</span>
        <Plus />
      </Button>

      {cards.map((card, index) => (
        <Card key={card.id} className="mb-2 bg-white">
          <div className="w-full border-b p-2 flex items-center justify-between">
            <span className="text-sm font-semibold px-2">{label}</span>
            <div className="flex gap-x-4">
              <button
                type="button"
                onClick={() => handleRemoveCard(card.id)}
                className="cursor-pointer rounded-md hover:bg-red-100 p-1"
              >
                <Trash2 className="text-red-500 w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleCollapseCard(card.id)}
                className="cursor-pointer rounded-md hover:bg-gray-100 px-1"
              >
                {card.isCollapsed ? (
                  <Plus className="w-4 h-4" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {!card.isCollapsed && (
            <CardContent className="mt-4">
              {/* ✅ Media Type Field */}
              <div className="form-layout my-2">
                <div className="lg:col-span-2 pb-2">
                  <h3 className="p-title">
                    type <span className="p-span">string</span>{" "}
                    <span className="p-span text-red-600">required</span>
                    <p className="text-sm font-normal mt-2">
                      Type of media file.
                    </p>
                  </h3>
                </div>
                <CustomFormSelect
                  id={`${name}.${card.id}.mediaType`}
                  name={`${name}.${index}.mediaType`}
                  control={control}
                  value={card.mediaType || ""}
                  onChange={(e) =>
                    handleChange(card.id, "mediaType", e.target.value)
                  }
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                  items={mapToSelectItems(Object.values(MediaTypes))}
                />
              </div>

              {/* ✅ URL Field */}
              <div className="form-layout my-2">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    url <span className="p-span">string</span>{" "}
                    <span className="p-span text-red-600">required</span>
                    <p className="text-sm font-normal mt-2">
                      The URL of media file. Formats supported: jpg, jpeg, png,
                      bmp.
                    </p>
                  </h3>
                </div>
                <CustomFormField
                  id={`${name}.${card.id}.url`}
                  name={`${name}.${index}.url`}
                  control={control}
                  value={card.url || ""}
                  onChange={(e) => handleChange(card.id, "url", e.target.value)}
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>

              {/* ✅ Placement Field */}
              <div className="form-layout my-2">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    placement <span className="p-span">integer</span>{" "}
                    <span className="p-span text-red-600">required</span>{" "}
                    <span className="p-span">1 to 5</span>
                    <p className="text-sm font-normal mt-2">
                      Ranking of the media file in product pages. Send "1" for
                      the primary media file.
                    </p>
                  </h3>
                </div>
                <CustomFormField
                  id={`${name}.${card.id}.placement`}
                  name={`${name}.${index}.placement`}
                  control={control}
                  value={
                    card.placement !== undefined ? String(card.placement) : ""
                  }
                  onChange={(e) =>
                    handleChange(card.id, "placement", e.target.value)
                  }
                  className={`hover:border-sidebar-ring mt-[0.4rem] ${
                    Number(card.placement) > 5 ||
                    (Number(card.placement) < 1 && Number(card.placement) === 0)
                      ? "border-red-500"
                      : "border-green-500"
                  }`}
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </FormProvider>
  );
};
