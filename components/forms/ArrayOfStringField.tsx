"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Control, useFormContext } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { CustomFormField } from "./FormComponents";

type ArrayOfStringFieldProps = {
  isCollapsed?: boolean;
  name: string;
  label: string;
  control?: Control<any>;
  className?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  description?: string;
  typeName?: string;
  requirement?: string;
  buttonName?: string;
};

const ArrayOfStringField: React.FC<ArrayOfStringFieldProps> = ({
  name,
  label,
  description,
  typeName,
  requirement,
  buttonName,
}) => {
  const { control, setValue } = useFormContext();
  const [cards, setCards] = useState<
    { id: number; value: string; isCollapsed: boolean }[]
  >([]);

  useEffect(() => {
    setValue(name, cards.length > 0 ? cards.map((card) => card.value) : []);
  }, [cards, name, setValue]);

  const handleAddCard = useCallback(() => {
    setCards((prevCards) => [
      ...prevCards,
      { id: Date.now(), value: "", isCollapsed: false },
    ]);
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

  return (
    <div>
      <Button
        type="button"
        onClick={handleAddCard}
        className="w-full border mb-2 justify-between bg-white hover:border-sidebar-ring"
      >
        <span>{buttonName}</span>
        <Plus />
      </Button>

      {cards.map((card, index) => (
        <div key={card.id}>
          <Card className="mb-2 bg-white">
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
                {description || typeName ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[0.25rem] ">
                    <div className="lg:col-span-2">
                      <h3 className="p-title">
                        {name} <span className="p-span">{typeName}</span>{" "}
                        <span className="p-span text-red-600">
                          {requirement}
                        </span>
                      </h3>
                      <p className="text-xs mt-2">{description}</p>
                    </div>
                    <CustomFormField
                      id={`${name}.${card.id}`}
                      name={`${name}.${index}`}
                      control={control}
                      value={card.value || ""}
                      onChange={(e) => {
                        const updatedCards = cards.map((c) =>
                          c.id === card.id ? { ...c, value: e.target.value } : c
                        );
                        setCards(updatedCards);
                        setValue(
                          name,
                          updatedCards.map((c) => c.value)
                        );
                      }}
                      className="hover:border-sidebar-ring mt-[0.4rem]"
                    />
                  </div>
                ) : (
                  <CustomFormField
                    id={`${name}.${card.id}`}
                    name={`${name}.${index}`}
                    control={control}
                    value={card.value || ""}
                    onChange={(e) => {
                      const updatedCards = cards.map((c) =>
                        c.id === card.id ? { ...c, value: e.target.value } : c
                      );
                      console.log(updatedCards);
                      setCards(updatedCards);
                      setValue(
                        name,
                        updatedCards.map((c) => c.value)
                      );
                    }}
                    className="hover:border-sidebar-ring mt-[0.4rem]"
                  />
                )}
              </CardContent>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ArrayOfStringField;
