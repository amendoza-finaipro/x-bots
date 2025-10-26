import { format } from "date-fns";

import { MoonIcon, MoreHorizontal, PlusIcon, SunIcon, TrashIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Button } from "../ui/button";

const items = [
  {
    title: "Chat 1",
    date: "2025-10-26",
    url: "/",
  },
  {
    title: "Chat 2",
    date: "2025-10-26",
    url: "/",
  },
];

export const ChatsList = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Button variant="secondary"><PlusIcon /> Nuevo chat</Button>
          <SidebarGroupLabel>Conversaciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex justify-between h-15">
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-xs text-muted-foreground">{format(item.date, "dd/MM/yyyy hh:mm bb")}</span>
                      </div>
                      <TrashIcon />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
