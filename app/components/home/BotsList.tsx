import { botsMockData, conversationsMockData } from "~/constants/data";
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
import { DocumentsModal } from "../general/DocumentsModal";
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
import { NEW_CONVERSATION } from "~/constants";
import { Spinner } from "../ui/spinner";

export const BotsList = () => {
  const [botDocumentsId, setBotDocumentsId] = useState<null | string>(null);
  const { data: botsList, isLoading } = trpc.bot.getAllBots.useQuery();

  if (isLoading || !botsList) return <BotsListSkeleton />;
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
      <ul className="grid lg:grid-cols-2 gap-5 pt-15">
        {botsList.bots.map((bot) => (
          <li key={bot.id}>
            <BotCard bot={bot} setBotDocumentsId={setBotDocumentsId} />
          </li>
        ))}
      </ul>
      {botDocumentsId && (
        <DocumentsModal
          isOpen={Boolean(botDocumentsId)}
          setIsOpen={(value) => !value && setBotDocumentsId(null)}
          botId={botDocumentsId}
        />
      )}
    </>
  );
};

const BotCard = ({
  bot,
  setBotDocumentsId,
}: {
  bot: Bot;
  setBotDocumentsId: (value: string) => void;
}) => {
  const { data: allConversations, isLoading } =
    trpc.conversation.getAllConversations.useQuery({ botId: bot.id });

  const conversationId = useMemo(() => {
    const firstConversation =
      allConversations?.conversations?.[0]?.conversation_id;
    return firstConversation ? `/${firstConversation}` : `/${NEW_CONVERSATION}`;
  }, [allConversations]);

  return (
    <>
      <Card className="h-full">
        <CardHeader className="h-full">
          <img src={chatbotImage} className="w-7" />
          <CardTitle>{bot.name}</CardTitle>
          <CardDescription>{bot.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between flex-wrap pb-2">
            <div className="flex gap-2 text-xs text-muted-foreground pb-5 items-center">
              <ClockIcon className="size-4" />
              Actualizado
              <span>{format(new Date(bot.updated_at), "dd/MM/yyyy")},</span>
              <span>{format(new Date(bot.updated_at), "hh:mm bb")}</span>
            </div>
            <div className="bg-accent py-2 px-4 rounded-lg border w-fit flex gap-4">
              <img src={bot.model.icon_url} className="size-8" alt="" />
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs font-semibold">
                  MODELO
                </span>
                <span className="text-sm font-bold">{bot.model.name}</span>
              </div>
            </div>
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
          <Button variant="ghost" onClick={() => setBotDocumentsId(bot.id)}>
            Documentos
          </Button>
          <Button asChild disabled={isLoading}>
            <Link to={`bot/${bot.id}${conversationId}`}>
              {isLoading ? <Spinner /> : "Abrir bot"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
