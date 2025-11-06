import { useParams } from "react-router";
import { trpc } from "~/trpc/client";
import type { MessageNoKey } from "~/types";

export const useChat = () => {
  const { botId, chatId } = useParams<{ botId: string; chatId: string }>();

  const conversationData = {
    botId: botId!,
    conversationId: chatId!,
    // TODO: change pages when available
    page: 1,
  };

  const { data: conversation } =
    trpc.conversation.getConversationById.useQuery(conversationData);
  const utils = trpc.useUtils();
  const { mutate: sendMessage, isPending: isBotPending } =
    trpc.conversation.sendMessage.useMutation({
      onMutate: async (message) => {
        utils.conversation.getConversationById.setData(
          conversationData,
          (old) => {
            if (!old) return;
            return {
              ...old,
              messages: [
                ...old?.messages,
                {
                  id: String(Math.random()),
                  content: message.message,
                  created_at: String(new Date()),
                  role: "user",
                },
              ],
            };
          }
        );
      },
      onSuccess: (response) => {
        const newMessage = response.messages.at(-1)?.content;
        if (!newMessage) return;
        utils.conversation.getConversationById.setData(
          conversationData,
          (old) => {
            if (!old) return;
            return {
              ...old,
              messages: [
                ...old?.messages,
                {
                  id: String(Math.random()),
                  content: newMessage,
                  created_at: String(new Date()),
                  role: "assistant",
                },
              ],
            };
          }
        );
      },
    });
  const messages = conversation?.messages;

  const addMessage = (message: MessageNoKey) =>
    sendMessage({
      botId: botId!,
      conversationId: chatId!,
      message: message.value,
    });

  return { messages, isBotPending, addMessage };
};
