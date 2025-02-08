import React from "react";
import { Button } from "../ui/button";

import { Plus } from "lucide-react";
import CardComponent from "../cards/CardComponent";
import { useLocalStorageForm } from "@/utils/hooks/useLocalStorageForm";
import { productListSchema } from "@/utils/types";

export function CategoryId() {
  const {
    cards,
    handleInputChange,
    handleAddCard,
    handleRemoveCard,
    toggleCollapseCard,
  } = useLocalStorageForm("categoryId", productListSchema);

  return (
    <div>
      <Button
        type="button"
        onClick={handleAddCard}
        className="w-full border mb-2 justify-between bg-white hover:border-sidebar-ring"
      >
        <span>ADD STRING</span>
        <Plus />
      </Button>

      {cards.map((card) => (
        <CardComponent
          key={card.id}
          id={card.id}
          value={card.value}
          isCollapsed={card.isCollapsed}
          onInputChange={handleInputChange}
          onRemoveCard={handleRemoveCard}
          onToggleCollapse={toggleCollapseCard}
        />
      ))}
    </div>
  );
}

export default CategoryId;
