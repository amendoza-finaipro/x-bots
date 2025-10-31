import { botsMockData, conversationsMockData } from "~/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { chatbotImage } from "@/components/assets/images";
import {
  ArrowUpRightIcon,
  BotIcon,
  BrainIcon,
  ClockIcon,
  EarIcon,
  RulerIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { DocumentsModal } from "../chat/DocumentsModal";
import type { Bot } from "~/types";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { format } from "date-fns";
import { trpc } from "~/trpc/client";
import { BotsListSkeleton } from "./BotsListSkeleton";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../ui/empty";

export const BotsList = () => {
  const [botDocumentsOpen, setBotDocumentsOpen] = useState(false);
  const { data: botsList, isLoading } = trpc.bot.getAllBots.useQuery();

  if (isLoading || !botsList) return <BotsListSkeleton />
  if (!botsList) return <></>;
  if (botsList.bots.length === 0) {
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
  }

  return (
    <>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-15">
        {botsList.bots.map((bot) => (
          <li key={bot.id}>
            <BotCard bot={bot} setBotDocumentsOpen={setBotDocumentsOpen} />
          </li>
        ))}
      </ul>
      <DocumentsModal
        isOpen={botDocumentsOpen}
        setIsOpen={setBotDocumentsOpen}
      />
    </>
  );
};

const BotCard = ({
  bot,
  setBotDocumentsOpen,
}: {
  bot: Bot;
  setBotDocumentsOpen: (value: boolean) => void;
}) => {
  const conversationId = useMemo(() => {
    return conversationsMockData[0]
      ? `/${conversationsMockData[0].conversation_id}`
      : "";
  }, []);

  return (
    <>
      <Card className="h-full">
        <CardHeader className="h-full">
          <img src={chatbotImage} className="w-7" />
          <CardTitle>{bot.name}</CardTitle>
          <CardDescription>{bot.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 text-xs text-muted-foreground pb-5 items-center">
            <ClockIcon className="size-4" />
            Actualizado
            <span>{format(new Date(bot.updated_at), "dd/MM/yyyy")},</span>
            <span>{format(new Date(bot.updated_at), "hh:mm bb")}</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <BotIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">Complejidad</span>
              <span className="text-sm pl-2">{bot.config.complexity}</span>
            </div>
            <div className="flex gap-2">
              <BrainIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">Tono</span>
              <span className="text-sm pl-2">{bot.config.friendliness}</span>
            </div>
            <div className="flex gap-2">
              <RulerIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">
                Longitud de respuesta
              </span>
              <span className="text-sm pl-2">{bot.config.response_length}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="ghost" onClick={() => setBotDocumentsOpen(true)}>
            Documentos
          </Button>
          <Button asChild>
            <Link to={`bot/${bot.id}${conversationId}`}>Abrir bot</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
