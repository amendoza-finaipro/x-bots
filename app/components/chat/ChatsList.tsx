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
import { ConfirmationModal } from "../general";

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
                  <SidebarMenuItem key={conversation.conversation_id}>
                    <div
                      className={cn(
                        "flex h-15 gap-0 p-0 hover:bg-accent rounded",
                        {
                          "bg-input": conversation.conversation_id === chatId,
                        }
                      )}
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
                    </div>
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
            <Link to="/dashboard">
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
  const { getFirstConversation } = useFirstConversation({ botId: botId! });
  const [isConfirming, setIsConfirming] = useState(false);
  const { mutate: deleteConversation, isPending: isDeleting } =
    trpc.conversation.deleteConversation.useMutation({
      onSuccess: async () => {
        let conversations: Conversation[] = [];
        utils.conversation.getAllConversations.setData(
          { botId: botId! },
          (old) => {
            if (!old) return;
            conversations = old.conversations.filter(
              (c) => c.conversation_id !== conversation.conversation_id
            );
            return { conversations };
          }
        );
        if (conversation.conversation_id === chatId) {
          const firstConversation = getFirstConversation(conversations);
          navigate(`/bot/${botId}/${firstConversation}`);
        }
        toast.success("Conversation deleted successfully");
      },
    });
  return (
    <>
      <Button
        variant="ghost"
        className="h-full hover:bg-destructive/20 dark:hover:bg-destructive/20"
        onClick={() => setIsConfirming(true)}
      >
        {isDeleting ? <Spinner /> : <TrashIcon />}
      </Button>
      <ConfirmationModal
        onConfirm={() => {
          const { conversation_id, bot_id } = conversation;
          deleteConversation({
            conversationId: conversation_id,
            botId: bot_id,
          });
        }}
        isLoading={isDeleting}
        onOpenChange={setIsConfirming}
        open={isConfirming}
      >
        ¿Seguro de borrar la conversación <b>{conversation.title}</b>?
      </ConfirmationModal>
    </>
  );
};
