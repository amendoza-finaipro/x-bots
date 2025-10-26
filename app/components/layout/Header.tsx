import { Logo } from "@/components/assets/icons";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";
import { ThemeButton } from "../general/ThemeButton";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <div className="flex gap-2 items-center">
          <Logo className="size-9" />
          <h1 className="font-bold">X-bots studio</h1>
        </div>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("hover:text-foreground", { "text-foreground": isActive })
            }
          >
            Mis bots
          </NavLink>
          <NavLink
            to="/create-bot"
            className={({ isActive }) =>
              cn("hover:text-foreground", { "text-foreground": isActive })
            }
          >
            Fábrica de bots
          </NavLink>
        </div>
      </div>
      <div className="flex gap-3">
        <ThemeButton variant="ghost" />
        <Button variant="secondary">Cerrar sesión</Button>
      </div>
    </header>
  );
};
