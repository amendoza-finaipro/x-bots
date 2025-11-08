import { chatbotImage } from "@/components/assets/images";
import { ClockIcon, BotIcon, BrainIcon, RulerIcon } from "lucide-react";
import { Link } from "react-router";
import { useFirstConversation } from "~/hooks";
import type { Bot, CreateBotOption } from "~/types";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Spinner } from "../ui/spinner";
import { format } from "date-fns";
import { BotOptions } from "./BotOptions";
import { trpc } from "~/trpc/client";
import { ConfirmationModal } from "../general";
import { useState } from "react";
import { toast } from "sonner";
import {
  complexityOptions,
  friendlinessOptions,
  responseLengthOptions,
} from "~/constants";

export const BotCard = ({
  bot,
  setBotDocumentsId,
  setBotToUpdate,
}: {
  bot: Bot;
  setBotDocumentsId: (value: string) => void;
  setBotToUpdate: (value: Bot) => void;
}) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const { firstConversation, isLoading } = useFirstConversation({
    botId: bot.id,
  });
  const { mutate: deleteBot, isPending: isDeleting } =
    trpc.bot.deleteBot.useMutation({
      onSuccess: () => {
        toast.success("Bot eliminado exitosamente");
        utils.bot.getAllBots.invalidate();
        setOpenDelete(false);
      },
    });

  const getOptionTitleByValue = (options: CreateBotOption[], value: string) => {
    return options.find((op) => op.value === value)?.title;
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="h-full">
          <div className="flex justify-between">
            <img src={chatbotImage} className="size-7" />
            <BotOptions
              onUpdate={() => setBotToUpdate(bot)}
              onDelete={() => setOpenDelete(true)}
            />
          </div>
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
              <span className="text-sm pl-2">
                {getOptionTitleByValue(
                  complexityOptions,
                  bot.config.complexity
                )}
              </span>
            </div>
            <div className="flex gap-2">
              <BrainIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">Tono</span>
              <span className="text-sm pl-2">
                {getOptionTitleByValue(
                  friendlinessOptions,
                  bot.config.friendliness
                )}
              </span>
            </div>
            <div className="flex gap-2">
              <RulerIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">
                Longitud de respuesta
              </span>
              <span className="text-sm pl-2">
                {getOptionTitleByValue(
                  responseLengthOptions,
                  bot.config.response_length
                )}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="ghost" onClick={() => setBotDocumentsId(bot.id)}>
            Documentos
          </Button>
          <Button asChild disabled={isLoading}>
            <Link to={`/bot/${bot.id}/${firstConversation}`}>
              {isLoading ? <Spinner /> : "Abrir bot"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <ConfirmationModal
        onConfirm={() => deleteBot({ botId: bot.id })}
        onOpenChange={setOpenDelete}
        open={openDelete}
        isLoading={isDeleting}
      >
        ¿Seguro de eliminar el bot <b>{bot.name}</b>?
      </ConfirmationModal>
    </>
  );
};
