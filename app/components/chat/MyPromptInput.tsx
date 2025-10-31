"use client";
import { avatarIcon } from "@/components/assets/images";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/shadcn-io/ai/prompt-input";
import type { MessageNoKey } from "~/types";
import { type FormEventHandler, useRef, useState } from "react";
import { ClipboardIcon, PaperclipIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FilesPrompt } from "./FilesPrompt";
import { useUserMessage } from "~/hooks";

interface Props {
  addMessage: (message: MessageNoKey) => void;
  disabled?: boolean;
  type?: "text" | "file";
  addFiles?: (files: File[]) => void;
}

export const MyPromptInput = ({
  addMessage,
  disabled,
  type = "text",
  addFiles,
}: Props) => {
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>(null);
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const { addUserMessage } = useUserMessage();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text && !files) {
      return;
    }
    let messageText = text;
    if (type === "file" && files) {
      addFiles?.(files);
      messageText = files.map(file => file.name).join("\n");
      setFiles(null);
    }
    setStatus("submitted");
    setTimeout(() => {
      setStatus("streaming");
    }, 200);
    setTimeout(() => {
      setStatus("ready");
      addMessage(addUserMessage(messageText));
      setText("");
    }, 200);
  };

  return (
    <div className="p-8 w-full">
      <PromptInput onSubmit={handleSubmit}>
        {type === "text" && (
          <PromptInputTextarea
            disabled={disabled}
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Type your message..."
          />
        )}
        {type === "file" && (
          <FilesPrompt files={files} setFiles={setFiles} />
        )}
        <PromptInputToolbar>
          <div></div>
          <PromptInputSubmit disabled={!text && !files?.length} status={status} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};
