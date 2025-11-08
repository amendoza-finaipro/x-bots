import { Header } from "~/components/layout/Header";
import { userMockData } from "~/constants/data";
import { Button } from "~/components/ui/button";
import { BotsList } from "~/components/home";
import { Link, redirect, useLoaderData } from "react-router";
import type { Route } from "../+types/_index";
import { auth } from "~/lib/auth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "X-bots studio" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return redirect('/')
  };
  return session;
};

export default function Home() {
  const session = useLoaderData<typeof loader>();
  // const session = { user: userMockData };

  return (
    <>
      <Header email={session.user.email} />
      <div className="container mx-auto p-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">¡Bienvenido de nuevo, {session.user.email}!</h1>
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
