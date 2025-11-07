import { format } from "date-fns";

import { PlusIcon, TrashIcon } from "lucide-react";
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

export const ChatsList = () => {
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const { botId } = useParams<{ botId: string }>();
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
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <Button variant="secondary" asChild>
              <Link to={`/bot/${botId}/new`}>
                <PlusIcon /> Nuevo chat
              </Link>
            </Button>
            <SidebarGroupLabel>Conversaciones</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {conversations?.conversations.map((conversation) => (
                  <SidebarMenuItem key={conversation.title}>
                    <SidebarMenuButton className="flex h-15 gap-0 p-0">
                      <div className="contents">
                        <Link
                          to={`/bot/${botId}/${conversation.conversation_id}`}
                          className="flex items-center h-15 grow p-2"
                        >
                          <div className="flex flex-col">
                            <span>{conversation.title}</span>
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
          <Button
            onClick={() => setDocumentsOpen(true)}
            className="group-data-[collapsible=icon]:hidden"
          >
            Gestionar documentos
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">Volver a bots</Link>
          </Button>
          <ThemeButton className="group-data-[collapsible=icon]:hidden" />
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
