import { DocumentsModal } from "../general/DocumentsModal";
import type { Bot } from "~/types";
import { useState } from "react";
import { trpc } from "~/trpc/client";
import { BotsListSkeleton } from "./BotsListSkeleton";
import { BotConfigModal } from "../general";
import { EmptyList } from "./EmptyList";
import { BotCard } from "./BotCard";

export const BotsList = () => {
  const [botDocumentsId, setBotDocumentsId] = useState<null | string>(null);
  const [botToUpdate, setBotToUpdate] = useState<null | Bot>(null);
  const { data: botsList, isLoading } = trpc.bot.getAllBots.useQuery();

  if (isLoading || !botsList) return <BotsListSkeleton />;
  if (!botsList) return <></>;
  if (botsList.bots.length === 0) return <EmptyList />;

  return (
    <>
      <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-15">
        {botsList.bots.map((bot) => (
          <li key={bot.id}>
            <BotCard
              bot={bot}
              setBotDocumentsId={setBotDocumentsId}
              setBotToUpdate={setBotToUpdate}
            />
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
      {botToUpdate && (
        <BotConfigModal
          botInfo={botToUpdate}
          onOpenChange={(value) => !value && setBotToUpdate(null)}
          open={Boolean(botToUpdate)}
        />
      )}
    </>
  );
};
