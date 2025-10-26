import { ChatsList } from "~/components/chat/ChatsList";
import type { Route } from "./+types/home";
import { MyChat } from "~/components/chat/MyChat";
import { SidebarProvider } from "~/components/ui/sidebar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <SidebarProvider>
      <ChatsList />
        <MyChat />
    </SidebarProvider>
  );
}
