import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/shadcn-io/ai/conversation";
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageOption,
} from "@/components/ui/shadcn-io/ai/message";
import React, { useEffect, useRef, useState } from "react";
import { MyPromptInput } from "../chat/MyPromptInput";
import type { MessageType, MessageNoKey, BotBlueprint } from "~/types";
import { createBotMessages } from "~/data/createBotMessages";
import { useUserMessage } from "~/hooks";
import { Input } from "../ui/input";
import { fileToBase64 } from "~/lib/file";

export const CreateBotChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  console.log({ messages });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [body, setBody] = useState<BotBlueprint>({
    attachments: [],
    complexity: "",
    response_length: "",
    friendliness: "",
    message: "",
  });
  const { addUserMessage } = useUserMessage();
  const didRun = useRef(false);

  const addBodyValue = (key: keyof BotBlueprint, value: string) => {
    setBody((current) => ({ ...current, [key]: value }));
    nextBotMessage();
  };

  const nextBotMessage = () => {
    setTimeout(() => {
      setMessages((current) => [...current, createBotMessages[currentIndex]]);
    }, 500);
    setCurrentIndex((index) => index + 1);
  };

  const addMessage = (message: MessageNoKey) => {
    if (messages.at(-1)?.key === 1) {
      setMessages((current) => [...current, { ...message, key: 2 }]);
      addBodyValue("message", message.value);
      return;
    }
    setMessages((current) => [
      ...current,
      {
        ...message,
        key: Math.max(...messages.map((message) => message.key)) + 0.5,
      },
    ]);
  };

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    nextBotMessage();
  }, []);

  useEffect(() => {
    if (messages.at(-1)?.expectedAnswer === "no-answer") {
      nextBotMessage();
    }
  }, [messages]);

  const getBodyFieldByKey = (key: number): keyof BotBlueprint => {
    if (key === 4) return "complexity";
    if (key === 5) return "friendliness";
    if (key === 6) return "response_length";
    throw new Error(`Key ${key} not supported`);
  };

  return (
    <>
      <Conversation className="relative size-full grow">
        <ConversationContent>
          <h1 className="font-bold text-xl">Fábrica de Bots</h1>
          <span className="text-sm text-muted-foreground">
            Crea un nuevo asistente mediante diseño conversacional.
          </span>
          {messages.map(
            ({ key, value, name, avatar, options, expectedAnswer }) => (
              <div key={key}>
                <Message from={name === "Assistant" ? "assistant" : "user"}>
                  <MessageContent className="whitespace-pre-line">{value}</MessageContent>
                  <MessageAvatar name={name} src={avatar} />
                </Message>
                {options && (
                  <div className="flex gap-4 flex-wrap pl-11">
                    {options.map((option) => (
                      <MessageOption
                        key={option.title}
                        description={option.description}
                        title={option.title}
                        selected={body[getBodyFieldByKey(key)] === option.value}
                        onClick={() => {
                          if (key !== messages.at(-1)?.key) return;
                          addBodyValue(getBodyFieldByKey(key), option.value);
                          addMessage(addUserMessage(option.value));
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <MyPromptInput
        addMessage={addMessage}
        addFiles={async (files) => {
          const attachments = await Promise.all(
            files.map(async (file) => ({
              filename: file.name,
              content_base64: await fileToBase64(file),
              content_type: file.type,
              size_bytes: file.size,
            }))
          );
          setBody({ ...body, attachments });
          nextBotMessage();
        }}
        disabled={messages.at(-1)?.expectedAnswer !== "text"}
        type={messages.at(-1)?.expectedAnswer === "file" ? "file" : "text"}
      />
    </>
  );
};
