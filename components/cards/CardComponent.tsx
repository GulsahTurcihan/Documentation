import { Card, CardContent } from "../ui/card";
import { Minus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";

interface CardProps {
  id: number;
  value: string;
  isCollapsed: boolean;
  onInputChange: (id: number, newValue: string) => void;
  onRemoveCard: (id: number) => void;
  onToggleCollapse: (id: number) => void;
}

const CardComponent: React.FC<CardProps> = ({
  id,
  value,
  isCollapsed,
  onInputChange,
  onRemoveCard,
  onToggleCollapse,
}) => {
  return (
    <Card className="mb-2">
      <div className="w-full border-b p-2 flex items-center justify-between">
        <span className="text-sm font-semibold px-2">STRING</span>
        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={() => onRemoveCard(id)}
            className="cursor-pointer rounded-md hover:bg-red-100"
          >
            <Trash2 className="text-red-500 w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onToggleCollapse(id)}
            className="cursor-pointer rounded-md hover:bg-gray-100"
          >
            <Minus className=" w-4 h-4 mr-2" />
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
        }`}
      >
        <CardContent className="mt-4">
          <Input
            value={value}
            onChange={(e) => onInputChange(id, e.target.value)}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export default CardComponent;
