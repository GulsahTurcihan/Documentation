import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ListHoverCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Tag className=" text-sidebar-border" size={16} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <div className="flex items-center gap-x-2">
              {" "}
              <h4 className="text-sm font-semibold">Products</h4>
              <Tag className=" text-sidebar-border" size={16} />
            </div>

            <p className="text-sm">Operations to manage the products.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
