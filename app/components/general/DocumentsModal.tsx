import { useRef, useState } from "react";
import { Badge, type BadgeProps } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { trpc } from "~/trpc/client";
import {
  fileToBase64,
  formatBytes,
  getFileExtensionLabel,
  shortenFileName,
} from "~/lib/file";
import type { BotDocumentBody } from "~/types";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  botId: string;
}

export const DocumentsModal = ({ isOpen, setIsOpen, botId }: Props) => {
  const [document, setDocument] = useState<BotDocumentBody | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: documentsList } = trpc.bot.getBotDocuments.useQuery({ botId });
  const utils = trpc.useUtils();
  const { mutate: addDocument, isPending: isUploading } =
    trpc.bot.addBotDocument.useMutation({
      onSuccess: () => {
        setDocument(null);
        toast.success("Document added succesfully");
        if (inputRef.current) inputRef.current.value = "";
        utils.bot.getBotDocuments.invalidate();
      },
    });

  const { mutate: deleteDocument } = trpc.bot.deleteBotDocument.useMutation({
    onSuccess: () => {
      toast.success("Document deleted succesfully");
      utils.bot.getBotDocuments.invalidate();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar documentos</DialogTitle>
          <DialogDescription>
            Añade, elimina, o revisa el estado de los documentos de este bot
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="document">Subir nuevo documento</Label>
            <div className="flex gap-2">
              <Input
                id="document"
                type="file"
                ref={inputRef}
                disabled={documentsList && documentsList.documents.length >= 3}
                onChange={async (e) => {
                  if (!e.target.files) return;
                  const file = Array.from(e.target.files)[0];
                  setDocument({
                    bot_id: botId,
                    filename: file.name,
                    content_base64: await fileToBase64(file),
                    content_type: file.type,
                    size_bytes: file.size,
                  });
                }}
              />
              {document && (
                <Button
                  onClick={() => addDocument(document)}
                  disabled={isUploading}
                >
                  {isUploading ? <Spinner /> : "Subir"}
                </Button>
              )}
            </div>
            <div className="text-muted-foreground text-xs">
              Hasta 3 documentos por bot
            </div>
          </div>
          <ul className="flex flex-col gap-3 p-5">
            {documentsList?.documents?.map((document) => {
              let badge: { variant: BadgeProps["variant"]; text: string } = {
                variant: "success",
                text: "Listo",
              };
              if (document.status === "error") {
                badge = { variant: "destructive", text: "Error" };
              }
              if (document.status === "pending") {
                badge = { variant: "warning", text: "Pendiente" };
              }
              return (
                <li className="flex" key={document.id}>
                  <div className="flex flex-col grow overflow-hidden">
                    <span className="text-bold text-ellipsis overflow-hidden">
                      {shortenFileName(document.filename)}
                    </span>
                    <div className="flex gap-2 items-center">
                      <span className="text-muted-foreground text-xs">
                        <span>{formatBytes(document.size_bytes)}</span>
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground text-xs">
                        {getFileExtensionLabel(document.filename)}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span>
                        <Badge variant={badge.variant}>{badge.text}</Badge>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* <Button variant="ghost" asChild>
                      <a href={document.blob_url} download>Descargar</a>
                    </Button> */}
                    <Button
                      variant="ghost"
                      onClick={() =>
                        deleteDocument({ documentId: document.id })
                      }
                    >
                      Eliminar
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const documents = [
  {
    id: 1,
    name: "document.pdf",
    weight: 307.7,
    type: "PDF",
    status: "pending",
  },
  {
    id: 2,
    name: "document.pdf",
    weight: 307.7,
    type: "PDF",
    status: "ready",
  },
];
