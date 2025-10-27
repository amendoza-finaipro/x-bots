import { PaperclipIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import {
  formatBytes,
  getFileExtensionLabel,
  shortenFileName,
} from "~/lib/file";

interface Props {
  files: File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

export const FilesPrompt = ({ files, setFiles }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3 border-none flex gap-2">
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={() => fileInputRef.current?.click()}
      >
        <PaperclipIcon />
      </Button>
      <ul className="flex gap-2">
        {files?.map((file) => (
          <Badge variant="outline" className="px-3 flex gap-2">
            <div className="flex flex-col">
              <span className="text-sm">{shortenFileName(file.name)}</span>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>{formatBytes(file.size)}</span>
                <span>·</span>
                <span>{getFileExtensionLabel(file.name)}</span>
              </div>
            </div>
            <button
              className="cursor-pointer"
              onClick={() =>
                setFiles(
                  (current) =>
                    current?.filter(
                      (fileItem) => fileItem.name !== file.name
                    ) || null
                )
              }
            >
              <XIcon className="size-3" />
            </button>
          </Badge>
        ))}
      </ul>
      <input
        type="file"
        accept=".pdf,.docx,.pptx,.xlsx,.xls"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          const newFiles = e.target.files && Array.from(e.target.files);
          const filesToInsert = [...(files ?? []), ...(newFiles ?? [])]
          if (filesToInsert.length > 3) {
            setFiles(filesToInsert.slice(0, 3));
            toast.warning("You can only select up to 3 files");
            return;
          }
          setFiles(filesToInsert);
        }}
      />
    </div>
  );
};
