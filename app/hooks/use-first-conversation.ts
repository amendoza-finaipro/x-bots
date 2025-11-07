import { useMemo } from "react";
import { NEW_CHAT_ID } from "~/constants";
import { trpc } from "~/trpc/client";

interface Params {
  botId: string;
}

export const useFirstConversation = ({ botId }: Params) => {
  const { data: allConversations, isLoading } =
    trpc.conversation.getAllConversations.useQuery({ botId });

  const firstConversation = useMemo(() => {
    const firstConversation =
      allConversations?.conversations?.[0]?.conversation_id;
    return firstConversation ? firstConversation : NEW_CHAT_ID;
  }, [allConversations]);

  return { firstConversation, isLoading, allConversations };
};
