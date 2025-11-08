import { Logo } from "@/components/assets/icons";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { userMockData } from "~/constants/data";
import { auth } from "~/lib/auth";
import { cn } from "~/lib/utils";
import type { Route } from "../../routes/+types/_index";
import { ThemeButton } from "../general/ThemeButton";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { toast } from "sonner";

const linkList = [
  { to: "/dashboard", label: "Mis bots" },
  { to: "/create-bot", label: "Fábrica de bots" },
];

export const Header = ({ email }: { email: string }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/otp");
  };

  return (
    <header className="p-5 flex items-center justify-between container mx-auto">
      <div className="flex items-center gap-12">
        <div className="flex gap-2 items-center">
          <Logo className="size-9" />
          <h1 className="font-bold">X-bots studio</h1>
        </div>

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

      <div className="hidden md:flex gap-3 items-center">
        <ThemeButton variant="ghost" />
        <span className="text-xs text-muted-foreground">{email}</span>
        <Button variant="secondary" asChild>
          <Link to="/otp">Cerrar sesión</Link>
        </Button>
      </div>

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
              <div className="flex justify-between items-center">
                <ThemeButton variant="outline" />
                <span className="text-xs text-muted-foreground">
                  {email}
                </span>
              </div>
              <Button variant="secondary" asChild>
                <Link to="/otp">Cerrar sesión</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
