import { toast } from "sonner";

export const sendToast = ({
  variant,
  title,
  message,
}: {
variant: "success" | "error";
  title: string;
  message: string;
}) => {
  toast[variant](
    <>
      <b>{title}</b>
      <p>{message}</p>
    </>,
  );
};
