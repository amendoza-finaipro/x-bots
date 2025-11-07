import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";

export const BotOptions = ({ onUpdate }: { onUpdate: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onUpdate}>Actualizar bot</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          Eliminar bot
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
