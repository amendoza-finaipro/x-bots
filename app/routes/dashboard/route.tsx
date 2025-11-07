import { Header } from "~/components/layout/Header";
import { userMockData } from "~/constants/data";
import { Button } from "~/components/ui/button";
import { BotsList } from "~/components/home";
import { Link } from "react-router";
import type { Route } from "../+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "X-bots studio" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">¡Bienvenido de nuevo, {userMockData.name}!</h1>
            <span className="text-muted-foreground text-sm">
              Supervisa tus bots orquestados, documentos y conversaciones
            </span>
          </div>
          <Button asChild>
            <Link to="/create-bot">
              Crear bot
            </Link>
          </Button>
        </div>
        <BotsList />
      </div>
    </>
  );
}
