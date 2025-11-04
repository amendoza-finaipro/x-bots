import { avatarIcon, chatbotImage } from "@/components/assets/images";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/shadcn-io/ai/message";
import { SidebarTrigger } from "../ui/sidebar";
import { trpc } from "~/trpc/client";
import { useParams } from "react-router";
import { userMockData } from "~/constants/data";
import type { MessageNoKey } from "~/types";
import { MyPromptInput } from "./MyPromptInput";

export const MyChat = () => {
  const { botId, chatId } = useParams<{ botId: string; chatId: string }>();
  const { data: conversation } = trpc.conversation.getConversationById.useQuery(
    {
      botId: botId!,
      conversationId: chatId!,
      // TODO: change pages when available
      page: 1,
    }
  );
  const {  } = trpc.conversation.sendMessage.useMutation();
  const messages = conversation?.messages;

  const addMessage = (message: MessageNoKey) => {
    
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="h-14 flex items-center gap-4 px-4 bg-sidebar">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-lg font-bold">x-bots</h1>
      </header>
      <Conversation className="relative size-full grow">
        <ConversationContent>
          {messages?.map(({ id, content, role }) => {
            const [name, avatar] =
              role === "user"
                ? [userMockData.name, avatarIcon]
                : ["assistant", chatbotImage];
            return (
              <Message from={role} key={id}>
                <MessageContent className="whitespace-break-spaces">{content}</MessageContent>
                <MessageAvatar name={name} src={avatar} />
              </Message>
            );
          })}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <MyPromptInput addMessage={addMessage} />
    </div>
  );
};
