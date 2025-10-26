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
import { useEffect, useState } from "react";
import { MyPromptInput } from "./MyPromptInput";
import type { MessageNoKey, MessageType } from "@/types";
import { SidebarTrigger } from "../ui/sidebar";

const messages: MessageType[] = [
  {
    key: 1,
    value: "Hello! How can I help you today?",
    name: "Assistant",
    avatar: chatbotImage,
  },
  {
    key: 2,
    value: "I'd like to learn about React hooks.",
    name: "Alex",
    avatar: avatarIcon,
  },
  {
    key: 3,
    value: "Great topic! Which hook interests you most?",
    name: "Assistant",
    avatar: chatbotImage,
  },
  {
    key: 4,
    value: "useState and useEffect are the most common ones.",
    name: "Alex",
    avatar: avatarIcon,
  },
  {
    key: 5,
    value: "Perfect! Let me show you some examples.",
    name: "Assistant",
    avatar: chatbotImage,
  },
  {
    key: 6,
    value: "That would be really helpful, thanks!",
    name: "Alex",
    avatar: avatarIcon,
  },
];

export const MyChat = () => {

  const [visibleMessages, setVisibleMessages] = useState<MessageType[]>([]);

  const addMessage = (message: MessageNoKey) => {
    setVisibleMessages((messages) => [
      ...messages,
      {
        key: (messages.at(-1)?.key || 0) + 1,
        ...message,
      }
    ])
  }

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length && messages[currentIndex]) {
        console.log("Me ejecute")
        const currentMessage = messages[currentIndex];
        setVisibleMessages((prev) => [
          ...prev,
          {
            key: currentMessage.key,
            value: currentMessage.value,
            name: currentMessage.name,
            avatar: currentMessage.avatar,
          },
        ]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="h-14 flex items-center gap-4 px-4 bg-sidebar">
        <SidebarTrigger className="lg:hidden"/>
        <h1 className="text-lg font-bold">x-bots</h1>
      </header>
      <Conversation className="relative size-full grow">
        <ConversationContent>
          {visibleMessages.map(({ key, value, name, avatar }) => (
            <Message from={name === "Assistant" ? "assistant" : "user"} key={key}>
              <MessageContent>{value}</MessageContent>
              <MessageAvatar name={name} src={avatar} />
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <MyPromptInput addMessage={addMessage} />
    </div>
  );
};
