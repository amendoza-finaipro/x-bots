import { Logo } from "@/components/assets/icons";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";
import { ThemeButton } from "../general/ThemeButton";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

const linkList = [
  { to: "/", label: "Mis bots" },
  { to: "/create-bot", label: "Fábrica de bots" },
];

export const Header = () => {
  return (
    <header className="p-5 flex items-center justify-between container mx-auto">
      {/* Sección izquierda */}
      <div className="flex items-center gap-12">
        <div className="flex gap-2 items-center">
          <Logo className="size-9" />
          <h1 className="font-bold">X-bots studio</h1>
        </div>

        {/* Links visibles solo en pantallas medianas o mayores */}
        <div className="hidden md:flex gap-5 text-sm text-muted-foreground">
          {linkList.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn("hover:text-foreground", { "text-foreground": isActive })
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Sección derecha (botones) visible solo en escritorio */}
      <div className="hidden md:flex gap-3">
        <ThemeButton variant="ghost" />
        <Button variant="secondary">Cerrar sesión</Button>
      </div>

      {/* Menú hamburguesa visible solo en mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="flex flex-col justify-between w-full p-5"
          >
            <div>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Logo className="size-7" />
                  <span className="font-semibold">X-bots studio</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-6 text-lg text-muted-foreground">
                {linkList.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      cn("hover:text-foreground", { "text-foreground": isActive })
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <ThemeButton variant="outline" />
              <Button variant="secondary">Cerrar sesión</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
