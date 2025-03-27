"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { CustomFormField } from "./FormComponents";
import { Separator } from "../ui/separator";

type VariantFormProps = {
  name: string; // e.g., "variants"
  label: string;
  description?: string;
  typeName?: string;
  requirement?: string;
  buttonName?: string;
  buttonNameMain?: string;
  onUpdate: (data: any) => void;
};

type CardData = {
  id: number;
  selectionId: string;
  stockQuantity: number;
  isCollapsed: boolean;
};

const VariantsForm: React.FC<VariantFormProps> = ({
  name,
  label,
  description,
  typeName,
  requirement,
  buttonNameMain = "Add Variant",
}) => {
  const { control, setValue } = useFormContext();
  const [cards, setCards] = useState<CardData[]>([]);

  // Sync with parent
  useEffect(() => {
    const cleanedVariant = cards.map(({ selectionId, stockQuantity }) => ({
      selectionId,
      stockQuantity: Number(stockQuantity),
    }));

    setValue(name, cleanedVariant, { shouldValidate: true });
  }, [cards, name, setValue]);

  const handleAddCard = useCallback(() => {
    setCards((prev) => [
      ...prev,
      {
        id: Date.now(),
        selectionId: "",
        stockQuantity: 1,
        isCollapsed: false,
      },
    ]);
  }, []);

  const handleRemoveCard = useCallback((id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const toggleCollapseCard = useCallback((id: number) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isCollapsed: !c.isCollapsed } : c))
    );
  }, []);

  const handleChange = (cardId: number, field: keyof CardData, value: any) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    );
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleAddCard}
        className="w-full border mb-2 justify-between bg-white hover:border-sidebar-ring"
      >
        <span>{buttonNameMain}</span>
        <Plus />
      </Button>

      {cards.map((card, index) => (
        <Card key={card.id} className="mb-4 bg-white">
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    selectionId <span className="p-span">{typeName}</span>
                    {requirement && (
                      <span className="p-span text-red-600">{requirement}</span>
                    )}
                  </h3>
                  <p className="text-xs mt-2">{description}</p>
                </div>
                <CustomFormField
                  name={`${name}.${index}.selectionId`}
                  control={control}
                  value={card.selectionId}
                  onChange={(e) =>
                    handleChange(card.id, "selectionId", e.target.value)
                  }
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    stockQuantity <span className="p-span">integer</span>
                  </h3>
                  <p className="text-sm">Stock quantity of the variant.</p>
                </div>
                <CustomFormField
                  name={`${name}.${index}.stockQuantity`}
                  control={control}
                  value={String(card.stockQuantity)}
                  onChange={(e) =>
                    handleChange(card.id, "stockQuantity", e.target.value)
                  }
                  className="hover:border-sidebar-ring mt-[0.4rem]"
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default VariantsForm;
