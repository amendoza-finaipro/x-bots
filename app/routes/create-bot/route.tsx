import { Header } from "~/components/layout/Header";
import type { Route } from "./+types/route";
import { CreateBotChat } from "~/components/create-bot";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CreateBotPage() {

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-5 grow flex flex-col min-h-0">
        <CreateBotChat />
      </div>
    </div>
  );
}
