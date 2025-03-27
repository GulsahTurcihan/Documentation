"use client";

import React from "react";
import { CustomFormField } from "@/components/forms/FormComponents";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Control, useFormContext } from "react-hook-form";
import { Card, CardContent } from "../ui/card";

type OptionsCardProps = {
  name: string;
  label: string;
  control?: Control<any>;
  className?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

type CardData = {
  id: number; // Unique ID
  value: string; // Option value
  isCollapsed: boolean; // Whether the card is collapsed
  optionId: string; // Option ID
  optionTitle: string; // Option title
  optionPrice: string; // Option price
};

export const OptionsForm: React.FC<OptionsCardProps> = ({ name, label }) => {
  const { control, setValue } = useFormContext();
  const [cards, setCards] = useState<CardData[]>([]);

  // ✅ useEffect updates form value when `cards` changes

  useEffect(() => {
    const cleanedOptions = cards.map(
      ({ optionId, optionTitle, optionPrice }) => ({
        optionId,
        optionTitle,
        optionPrice,
      })
    );
    setValue(name, cleanedOptions, { shouldValidate: true });
  }, [cards, name, setValue]);

  // ✅ Add a new card

  const handleAddCard = useCallback(() => {
    setCards((prevCards) => [
      ...prevCards,
      {
        id: Date.now(),
        value: "",
        isCollapsed: false,
        optionId: "",
        optionPrice: "",
        optionTitle: "",
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
              {/* ✅ optionId Field */}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    optionId <span className="p-span">string</span>{" "}
                    <p className="text-sm font-normal mt-[0.25rem]">
                      The ID of option.
                    </p>
                  </h3>
                </div>
                <CustomFormField
                  className="hover:border-sidebar-ring mt-[0.4rem] mb-2 "
                  id={`${name}.${card.id}.optionId`}
                  name={`${name}.${index}.optionId`}
                  control={control}
                  value={
                    card.optionId !== undefined ? String(card.optionId) : ""
                  }
                  onChange={(e) =>
                    handleChange(card.id, "optionId", e.target.value)
                  }
                />
              </div>

              {/* ✅ optionTitle Field */}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    optionTitle <span className="p-span">string</span>{" "}
                    <p className="text-sm font-normal mt-[0.25rem]">
                      The title of option.
                    </p>
                  </h3>
                </div>
                <CustomFormField
                  className="hover:border-sidebar-ring mt-[0.4rem] mb-2"
                  id={`${name}.${card.id}.optionTitle`}
                  name={`${name}.${index}.optionTitle`}
                  control={control}
                  value={
                    card.optionTitle !== undefined
                      ? String(card.optionTitle)
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(card.id, "optionTitle", e.target.value)
                  }
                />
              </div>

              {/* ✅ optionPrice Field */}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem]">
                <div className="lg:col-span-2">
                  <h3 className="p-title">
                    optionPrice <span className="p-span">string</span>{" "}
                    <p className="text-sm font-normal mt-[0.25rem]">
                      The price of option.
                    </p>
                  </h3>
                </div>
                <CustomFormField
                  id={`${name}.${card.id}.optionPrice`}
                  name={`${name}.${index}.optionPrice`}
                  control={control}
                  value={
                    card.optionTitle !== undefined
                      ? String(card.optionPrice)
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(card.id, "optionPrice", e.target.value)
                  }
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
