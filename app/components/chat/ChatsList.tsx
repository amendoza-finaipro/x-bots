import { format } from "date-fns";

import {
  MoonIcon,
  MoreHorizontal,
  PlusIcon,
  SunIcon,
  TrashIcon,
} from "lucide-react";
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
import { useState } from "react";
import { DocumentsModal } from "./DocumentsModal";
import { Link } from "react-router";
import { ThemeButton } from "../general/ThemeButton";

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
  const [documentsOpen, setDocumentsOpen] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <Button variant="secondary">
              <PlusIcon /> Nuevo chat
            </Button>
            <SidebarGroupLabel>Conversaciones</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex justify-between h-15">
                        <div className="flex flex-col">
                          <span>{item.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(item.date, "dd/MM/yyyy hh:mm bb")}
                          </span>
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
            onClick={() => setDocumentsOpen(true)}
            className="group-data-[collapsible=icon]:hidden"
          >
            Gestionar documentos
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/" >
              Volver a bots
            </Link>
          </Button>
          <ThemeButton className="group-data-[collapsible=icon]:hidden" />
        </SidebarFooter>
      </Sidebar>
      <DocumentsModal isOpen={documentsOpen} setIsOpen={setDocumentsOpen} />
    </>
  );
};
