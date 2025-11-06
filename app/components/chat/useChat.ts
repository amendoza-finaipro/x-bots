import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NEW_CHAT_ID, NEW_CONVERSATION_NAME } from "~/constants";
import { trpc } from "~/trpc/client";
import type { Conversation, MessageNoKey } from "~/types";

export const useChat = () => {
  const { botId, chatId: chatIdParams } = useParams<{
    botId: string;
    chatId: string;
  }>();
  const navigate = useNavigate();
  const [chatId, setChatId] = useState(chatIdParams);

  useEffect(() => {
    setChatId(chatIdParams);
  }, [chatIdParams]);

  const conversationData = {
    botId: botId!,
    conversationId: chatId!,
    // TODO: change pages when available
    page: 1,
  };

  const { data: conversation } = trpc.conversation.getConversationById.useQuery(
    conversationData,
    {
      enabled: Boolean(chatId) && chatId !== NEW_CHAT_ID,
    }
  );

  const utils = trpc.useUtils();
  const { mutateAsync: sendMessage, isPending: isBotPending } =
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
        const allConversations = utils.conversation.getAllConversations.getData(
          { botId: botId! }
        );
        const someConversationIsNew = allConversations?.conversations.some(
          (conversation) => conversation.title === NEW_CONVERSATION_NAME
        );
        if (someConversationIsNew) {
          utils.conversation.getAllConversations.refetch();
        }
      },
    });

  const { mutateAsync: createConversation } =
    trpc.conversation.createConversation.useMutation({
      onSuccess: (data) => {
        utils.conversation.getAllConversations.setData(
          { botId: botId! },
          (old) =>
            old && {
              conversations: [
                { ...data, title: NEW_CONVERSATION_NAME },
                ...old?.conversations,
              ],
            }
        );
      },
    });

  const messages = conversation?.messages;

  const addMessage = async (message: MessageNoKey) => {
    let currentChatId = chatId;
    if (currentChatId === NEW_CHAT_ID) {
      const data = await createConversation({ botId: botId! });
      currentChatId = data.conversation_id;
      setChatId(data.conversation_id);
      navigate(`/bot/${botId}/${currentChatId}`);
    }
    await sendMessage({
      botId: botId!,
      conversationId: currentChatId!,
      message: message.value,
    });
    checkNewConversationName();
  };

  const checkNewConversationName = () => {
    const allConversations = utils.conversation.getAllConversations.getData({
      botId: botId!,
    });
    const someConversationIsNew = allConversations?.conversations.some(
      (conversation) => conversation.title === NEW_CONVERSATION_NAME
    );
    if (someConversationIsNew) {
      utils.conversation.getAllConversations.refetch();
    }
  };

  return { messages, isBotPending, addMessage, chatId };
};
