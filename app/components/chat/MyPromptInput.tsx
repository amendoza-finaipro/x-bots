"use client";
import { avatarIcon } from "@/components/assets/images";
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import type { MessageNoKey } from "@/types";
import { PaperclipIcon } from "lucide-react";
import { type FormEventHandler, useState } from "react";

interface Props {
  addMessage: (message: MessageNoKey) => void;
}

export const MyPromptInput = ({ addMessage }: Props) => {
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    setStatus("submitted");
    setTimeout(() => {
      setStatus("streaming");
    }, 200);
    setTimeout(() => {
      setStatus("ready");
      addMessage({
        value: text,
        avatar: avatarIcon,
        name: "Alex",
      });
      setText("");
    }, 2000);
  };

  return (
    <div className="p-8 w-full">
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputTextarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Type your message..."
        />
        <PromptInputToolbar>
          <div></div>
          <PromptInputSubmit disabled={!text} status={status} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};
