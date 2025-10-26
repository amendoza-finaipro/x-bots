import { useState } from "react";
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

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const DocumentsModal = ({ isOpen, setIsOpen }: Props) => {
  const [document, setDocument] = useState<FileList | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar documentos</DialogTitle>
          <DialogDescription>
            Añade, elimina, o revisa el estado de los documentos de este bot
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="document">Subir nuevo documento</Label>
            <div className="flex gap-2">
              <Input
                id="document"
                type="file"
                onChange={(e) => setDocument(e.target.files)}
              />
              {document && <Button>Subir</Button>}
            </div>
            <div className="text-muted-foreground text-xs">
              Hasta 3 documentos por bot
            </div>
          </div>
          <ul className="flex flex-col gap-3 p-5">
            {documents.map((document) => {
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
                <li className="flex">
                  <div className="flex flex-col grow">
                    <span className="text-bold">{document.name}</span>
                    <div className="flex gap-2 items-center">
                      <span className="text-muted-foreground text-xs">
                        {document.weight} KB
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground text-xs">
                        {document.type}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span>
                        <Badge variant={badge.variant}>{badge.text}</Badge>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost">Descargar</Button>
                    <Button variant="ghost">Eliminar</Button>
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
