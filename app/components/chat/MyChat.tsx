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
import { userMockData } from "~/constants/data";
import { MyPromptInput } from "./MyPromptInput";
import { TypingIndicator } from "../ui/typing-indicator";
import { useChat } from "./useChat";
import Markdown from "react-markdown";
import { MDComponents } from "~/mdx-components";
import { NEW_CHAT_ID } from "~/constants";

export const MyChat = () => {
  const { messages, isBotPending, addMessage, chatId, botInfo } = useChat();

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="h-14 flex items-center gap-4 px-4 bg-sidebar">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-lg font-bold">{botInfo?.name}</h1>
      </header>
      <Conversation className="relative size-full grow">
        <ConversationContent>
          {chatId === NEW_CHAT_ID && (
            <NewConversationCard />
          )}
          {messages?.map(({ id, content, role }) => {
            const [name, avatar] =
              role === "user"
                ? [userMockData.name, avatarIcon]
                : ["assistant", chatbotImage];
            return (
              <Message from={role} key={id}>
                <MessageContent>
                  <Markdown components={MDComponents}>{content}</Markdown>
                </MessageContent>
                <MessageAvatar name={name} src={avatar} />
              </Message>
            );
          })}
          {isBotPending && <TypingIndicator />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <MyPromptInput addMessage={addMessage} />
    </div>
  );
};

const NewConversationCard = () => (
  <div className="pt-10 flex justify-center">
    <div className="rounded-xl bg-card w-4/5 border border-dash flex justify-center items-center py-9 flex-col gap-4">
      <p className="bold text-sm">
        Estás componiendo una conversación nueva. Tu primer mensaje la guardará
        automáticamente.
      </p>
      <p className="text-muted-foreground text-xs">
        Comienza la conversación enviando un mensaje.
      </p>
    </div>
  </div>
);
