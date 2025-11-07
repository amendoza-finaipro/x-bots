import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  message: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  open,
  onOpenChange,
  message,
  onConfirm,
  isLoading,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atención</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Spinner />}
            Eliminar
          </Button>
          <Button variant="secondary">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
