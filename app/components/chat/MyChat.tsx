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

export const MyChat = () => {
  const { messages, isBotPending, addMessage } = useChat();

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
                <MessageContent>
                  <Markdown components={MDComponents}>
                    {content}
                  </Markdown>
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
