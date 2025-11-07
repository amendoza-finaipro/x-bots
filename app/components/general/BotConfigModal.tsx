import { trpc } from "~/trpc/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { Bot, CreateBotOption, UpdateBot } from "~/types";
import { MessageOption } from "@/components/ui/shadcn-io/ai/message";
import {
  complexityOptions,
  friendlinessOptions,
  responseLengthOptions,
} from "~/constants";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  botInfo: Bot | undefined;
}

export const BotConfigModal = ({ open, onOpenChange, botInfo }: Props) => {
  const { data: models } = trpc.model.getAllModels.useQuery();
  const [botData, setBotData] = useState<UpdateBot>();

  const changeData = (key: keyof UpdateBot, value: string) =>
    setBotData((data) => data && { ...data, [key]: value });

  const utils = trpc.useUtils();

  const { mutate: updateBot, isPending } = trpc.bot.updateBot.useMutation({
    onSuccess: () => {
      utils.bot.getAllBots.invalidate();
      onOpenChange(false);
      toast.success("Bot updated successfully");
    },
  });

  useEffect(() => {
    if (botInfo) {
      setBotData({
        ...botInfo.config,
        botId: botInfo.id,
        model_id: botInfo.model.id,
      });
    }
  }, [botInfo]);

  if (!botInfo || !botData) return <></>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:w-170 w-[90vw] sm:max-w-[90vw] max-w-[90vw] p-0">
        <DialogHeader>
          <DialogTitle className="px-5 pt-4">{botInfo.name}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto px-5 pb-0.5">
          <ul>
            <li>
              {models && (
                <OptionsList
                  name="Modelo"
                  options={models.map((model) => ({
                    ...model,
                    imageUrl: model.icon_url,
                    title: model.name,
                    value: model.id,
                  }))}
                  botData={botData}
                  botKey="model_id"
                  setBotData={setBotData}
                />
              )}
            </li>
            <li className="pt-5">
              <OptionsList
                name="Complejidad"
                options={complexityOptions}
                botData={botData}
                botKey="complexity"
                setBotData={setBotData}
              />
            </li>
            <li className="pt-5">
              <OptionsList
                name="Tono"
                options={friendlinessOptions}
                botData={botData}
                botKey="friendliness"
                setBotData={setBotData}
              />
            </li>
            <li className="pt-5">
              <OptionsList
                name="Longitud de respuesta"
                options={responseLengthOptions}
                botData={botData}
                botKey="response_length"
                setBotData={setBotData}
              />
            </li>
            <li className="pt-5">
              <Label className="pb-1">Max tokens</Label>
              <Input
                value={botData.max_tokens}
                onChange={(e) => changeData("max_tokens", e.target.value)}
                className="max-w-50"
              />
            </li>
            <li className="pt-5">
              <Label className="pb-1">Instrucciones</Label>
              <Textarea
                value={botData.instructions}
                onChange={(e) => changeData("instructions", e.target.value)}
                className="max-h-42 resize-none"
              />
            </li>
          </ul>
        </div>
        <DialogFooter className="pb-4 px-4">
          <Button onClick={() => updateBot(botData)} disabled={isPending}>
            {isPending ? <Spinner /> : "Guardar"}
          </Button>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface OptionsListProps {
  options: CreateBotOption[];
  name: string;
  botData: UpdateBot;
  setBotData: (data: UpdateBot) => void;
  botKey: keyof UpdateBot;
}

const OptionsList = ({
  options,
  name,
  botData,
  botKey,
  setBotData,
}: OptionsListProps) => {
  return (
    <div>
      <div className="text-center pb-3 font-semibold">{name}</div>
      <div className="flex gap-4 justify-center flex-wrap">
        {options.map((option) => (
          <MessageOption
            title={option.title}
            key={option.value}
            description={option.description}
            imageUrl={option.imageUrl}
            selected={botData[botKey] === option.value}
            onClick={() => setBotData({ ...botData, [botKey]: option.value })}
          />
        ))}
      </div>
    </div>
  );
};
