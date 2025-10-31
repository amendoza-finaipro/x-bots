import { ChatsList } from "~/components/chat/ChatsList";
import { MyChat } from "~/components/chat/MyChat";
import { SidebarProvider } from "~/components/ui/sidebar";
import type { Route } from "./+types/route";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Bot" }];
}

export default function BotChatPage() {
  return (
    <SidebarProvider>
      <ChatsList />
      <MyChat />
    </SidebarProvider>
  );
}
