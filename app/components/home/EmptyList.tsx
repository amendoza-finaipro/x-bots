import { BotIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "../ui/empty";

export const EmptyList = () => {
  return (
    <div className="pt-10">
      <Empty className="w-full border border-dash ">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BotIcon />
          </EmptyMedia>
          <EmptyTitle>Sin bots</EmptyTitle>
          <EmptyDescription>
            No has creado tu primer bot aun. Comienza creando tu primer bot
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/create-bot">Crear Bot</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};