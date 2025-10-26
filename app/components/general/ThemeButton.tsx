import { useTheme } from "@/components/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button, type buttonProps } from "../ui/button";

interface ThemeButtonProps {
  className?: string;
  variant?: buttonProps["variant"];
}

export const ThemeButton = ({className, variant = "secondary"}: ThemeButtonProps) => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      size="icon"
      variant={variant}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={className}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
