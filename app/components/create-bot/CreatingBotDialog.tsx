import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { Spinner } from "../ui/spinner";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export function CreatingBotDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="flex gap-2 items-center">
          <Spinner className="size-7" /> Enviando blueprint al orquestador…
        </DialogTitle>
        <p className="text-sm">
          Estamos armando tu asistente. Los documentos pueden seguir
          procesándose después de que aparezcan en el panel.
        </p>
      </DialogContent>
    </Dialog>
  );
}
