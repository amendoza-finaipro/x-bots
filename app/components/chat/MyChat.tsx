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
import { useWriteText } from "~/hooks";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { BotConfigModal } from "./BotConfigModal";

export const MyChat = () => {
  const {
    messages,
    isBotPending,
    addMessage,
    chatId,
    botInfo,
    botConfigOpen,
    setBotConfigOpen,
  } = useChat();

  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <header className="h-14 flex items-center gap-4 px-4 bg-sidebar">
          <SidebarTrigger className="lg:hidden" />
          <h1 className="text-lg font-bold">{botInfo?.name}</h1>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setBotConfigOpen(true)}
          >
            <Settings />
            Configuración
          </Button>
        </header>
        <Conversation className="relative size-full grow">
          <ConversationContent>
            {chatId === NEW_CHAT_ID && <NewConversationCard />}
            {messages?.map((message) => (
              <ChatMessage {...message} key={message.id} />
            ))}
            {isBotPending && <TypingIndicator />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <MyPromptInput addMessage={addMessage} />
      </div>
      <BotConfigModal open={botConfigOpen} botInfo={botInfo} onOpenChange={setBotConfigOpen} />
    </>
  );
};

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  isNew: boolean;
}

const ChatMessage = ({ content, role, isNew }: ChatMessageProps) => {
  const [name, avatar] =
    role === "user"
      ? [userMockData.name, avatarIcon]
      : ["assistant", chatbotImage];

  const { text: contentTyping } = useWriteText({ fullText: content });

  return (
    <Message from={role}>
      <MessageContent>
        <Markdown components={MDComponents}>
          {role === "assistant" && isNew ? contentTyping : content}
        </Markdown>
      </MessageContent>
      <MessageAvatar name={name} src={avatar} />
    </Message>
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
