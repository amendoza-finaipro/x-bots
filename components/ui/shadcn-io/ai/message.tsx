import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { cn } from "@/app/lib/utils";
import type { UIMessage } from "ai";
import { useState, type ComponentProps, type HTMLAttributes } from "react";
import { Button } from "~/components/ui/button";
import type { MessageOptionType } from "~/types/Message";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
      "[&>div]:max-w-[80%]",
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      "flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-foreground text-sm",
      "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
      "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground",
      className
    )}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);

interface MessageOptionProps {
  title: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  className?: string;
}

export const MessageOption = ({
  title,
  description,
  onClick,
  selected,
  className,
}: MessageOptionProps) => {
  return (
    <Button
      className={cn(
        "flex flex-col gap-2 rounded-lg px-4 py-3 text-foreground text-sm bg-secondary max-w-40 whitespace-normal h-auto text-left justify-start items-start",
        {"border-blue-500 dark:border-blue-500": selected},
        className
      )}
      variant="outline"
      onClick={onClick}
    >
      <span className="font-semibold">{title}</span>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Button>
  );
};

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}: MessageAvatarProps) => (
  <Avatar className={cn("size-8 ring ring-border", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);
