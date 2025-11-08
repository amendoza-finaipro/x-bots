import type { Route } from "./+types/_index";
import { Button } from "~/components/ui/button";
import { Link, useLoaderData } from "react-router";
import { Badge } from "~/components/ui/badge";
import { env } from "~/lib/env";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Logo } from "@/components/assets/icons";
import { ThemeButton } from "~/components/general";

export function meta({}: Route.MetaArgs) {
  return [{ title: "X-bots studio" }];
}

export function loader() {
  const url = env.BACKEND_BASE_URL.replace("/api/v1", "");
  return { docsUrl: `${url}/scalar` };
}

export default function Home() {
  const { docsUrl } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(120deg,rgba(29,78,216,0.08),rgba(147,51,234,0.12),rgba(16,185,129,0.08))]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold tracking-tight"
              >
                <Logo />
                <span className="hidden sm:inline-block">X-Bots Studio</span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                <ThemeButton />
                <Button
                  asChild
                  variant="outline"
                  className="sm:inline-flex"
                >
                  <Link to="/otp">Login</Link>
                </Button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-24 pt-16 lg:px-10 lg:pt-24">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <Badge className="w-fit bg-indigo-500/20 text-indigo-700 dark:bg-indigo-400/20 dark:text-indigo-200">
                  Diseña un bot solo describiéndolo.
                </Badge>
                <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Crea bots personalizados en minutos.
                </h1>
                <p className="text-pretty text-lg text-muted-foreground sm:text-xl">
                  Diseña, entrena y lanza X-Bots con un asistente conversacional
                  y crea asistentes personalizados a medida en 30 segundos.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="h-11 rounded-full px-7 text-base font-semibold"
                  >
                    <Link to="/dashboard">Empieza a crear bots</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-full px-7 text-base"
                    asChild
                  >
                    <Link to={docsUrl} target="_blank" rel="noreferrer">
                      Explorar documentación
                    </Link>
                  </Button>
                </div>
              </div>

              <Card
                id="demo-login-card"
                className="relative flex flex-col overflow-hidden border-muted bg-background/80 shadow-xl shadow-indigo-600/10 backdrop-blur"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-sky-400/10 to-transparent dark:from-indigo-500/15 dark:via-sky-400/10" />
                <CardHeader className="space-y-2 pb-2">
                  <CardTitle>Entra directo al dashboard en vivo</CardTitle>
                  <CardDescription>
                    Explora orquestadores, documentos y métricas con datos de
                    ejemplo precargados.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-6 pb-8 pt-4">
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Ingresa al workspace productivo con bots, documentos y
                      métricas de salud precargadas.
                    </p>
                    <Button
                      className="h-12 w-full rounded-xl text-base font-semibold"
                      asChild
                    >
                      <Link to="/dashboard">Ir al dashboard</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <section className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <Card
                  key={feature.key}
                  className="group relative overflow-hidden border-none bg-gradient-to-br from-background/90 to-muted/50 shadow-lg shadow-indigo-500/10 transition hover:-translate-y-1 hover:shadow-xl dark:shadow-none"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-transparent to-transparent" />
                  </div>
                  <CardHeader className="space-y-4">
                    <Badge className="w-fit rounded-full bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-100">
                      {String(index + 1).padStart(2, "0")}
                    </Badge>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

const features = [
  {
    key: "orchestrator",
    title: "Fábrica conversacional de bots",
    description:
      "Define capacidades, estilo y fuentes de datos mediante un flujo guiado por IA.",
  },
  {
    key: "documents",
    title: "Inteligencia con documentos",
    description:
      "Sube hasta tres bases de conocimiento por bot, monitorea el procesamiento y gestiona cambios al instante.",
  },
  {
    key: "conversations",
    title: "Espacio operativo",
    description:
      "Chatea con cualquier bot con navegación multi-hilo y memoria persistente.",
  },
  {
    key: "governance",
    title: "Listo para gobernanza",
    description:
      "Controla el estado de los documentos, bloquea bots en preparación y mantén trazabilidad alineada.",
  },
];
