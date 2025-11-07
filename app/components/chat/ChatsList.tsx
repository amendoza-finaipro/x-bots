import { format } from "date-fns";

import { BotIcon, FileIcon, PlusIcon, Settings, TrashIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { useState } from "react";
import { DocumentsModal } from "../general/DocumentsModal";
import { Link, useNavigate, useParams } from "react-router";
import { ThemeButton } from "../general/ThemeButton";
import { trpc } from "~/trpc/client";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import type { Conversation } from "~/types";
import { useFirstConversation } from "~/hooks";
import { NEW_CONVERSATION_NAME } from "~/constants";
import { cn } from "~/lib/utils";

export const ChatsList = () => {
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const { botId, chatId } = useParams<{ botId: string; chatId: string }>();
  const { data: conversations } =
    trpc.conversation.getAllConversations.useQuery({ botId: botId! });

  if (!botId) return <></>;

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <Button variant="secondary" asChild>
              <Link to={`/bot/${botId}/new`}>
                <PlusIcon className="pointer-events-none" />
                <span className="group-data-[collapsible=icon]:hidden pointer-events-none">
                  Nuevo chat
                </span>
              </Link>
            </Button>
            <SidebarGroupLabel className="pointer-events-none">
              Conversaciones
            </SidebarGroupLabel>
            <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
              <SidebarMenu>
                {conversations?.conversations.map((conversation) => (
                  <SidebarMenuItem key={conversation.title}>
                    <SidebarMenuButton
                      className={cn("flex h-15 gap-0 p-0", {
                        "bg-input": conversation.conversation_id === chatId,
                      })}
                    >
                      <div className="contents">
                        <Link
                          to={`/bot/${botId}/${conversation.conversation_id}`}
                          className="flex items-center h-15 grow p-2"
                        >
                          <div className="flex flex-col">
                            <span>
                              {conversation.title || NEW_CONVERSATION_NAME}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(
                                conversation.created_at,
                                "dd/MM/yyyy hh:mm bb"
                              )}
                            </span>
                          </div>
                        </Link>
                        <DeleteConversationButton conversation={conversation} />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button onClick={() => setDocumentsOpen(true)}>
            <FileIcon />
            <span className="group-data-[collapsible=icon]:hidden">
              Gestionar documentos
            </span>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">
              <BotIcon />
              <span className="group-data-[collapsible=icon]:hidden">
                Volver a bots
              </span>
            </Link>
          </Button>
          <ThemeButton />
        </SidebarFooter>
      </Sidebar>
      <DocumentsModal
        isOpen={documentsOpen}
        setIsOpen={setDocumentsOpen}
        botId={botId}
      />
    </>
  );
};

const DeleteConversationButton = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const utils = trpc.useUtils();
  const navigate = useNavigate();
  const { chatId, botId } = useParams<{ chatId: string; botId: string }>();
  const { firstConversation } = useFirstConversation({ botId: botId! });
  const { mutate: deleteConversation, isPending: isDeleting } =
    trpc.conversation.deleteConversation.useMutation({
      onSuccess: async () => {
        await utils.conversation.getAllConversations.refetch();
        if (conversation.conversation_id === chatId) {
          navigate(`/bot/${botId}/${firstConversation}`);
        }
        toast.success("Conversation deleted successfully");
      },
    });
  return (
    <Button
      variant="ghost"
      className="h-full hover:bg-destructive/20 dark:hover:bg-destructive/20"
      onClick={(e) => {
        e.stopPropagation();
        const { conversation_id, bot_id } = conversation;
        deleteConversation({
          conversationId: conversation_id,
          botId: bot_id,
        });
      }}
      disabled={isDeleting}
    >
      {isDeleting ? <Spinner /> : <TrashIcon />}
    </Button>
  );
};
