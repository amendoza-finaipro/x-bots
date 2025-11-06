import { initTRPC } from "@trpc/server";
import { getHeaders, getUrlWithUID, type Context } from "../context";
import { env } from "~/lib/env";
import {
  createConversationSchema,
  deleteConversationSchema,
  getAllConversationsSchema,
  getConversationByIdSchema,
  sendMessageSchema,
} from "../schemas";
import type { Conversation, SendMessageRes } from "~/types";

const t = initTRPC.context<Context>().create();

export const conversationRouter = t.router({
  getAllConversations: t.procedure
    .input(getAllConversationsSchema)
    .query(
      async ({ ctx, input }): Promise<{ conversations: Conversation[] }> => {
        const url = new URL(
          `${env.BACKEND_BASE_URL}/bots/${input.botId}/conversations`
        );
        const res = await fetch(getUrlWithUID({ url, ctx }), {
          headers: getHeaders(ctx),
        });
        if (!res.ok) {
          throw new Error("Error fetching conversations");
        }
        return res.json();
      }
    ),
  getConversationById: t.procedure
    .input(getConversationByIdSchema)
    .query(async ({ ctx, input }): Promise<Conversation> => {
      const { botId, conversationId, page } = input;
      const url = new URL(
        `${env.BACKEND_BASE_URL}/bots/${botId}/conversations/${conversationId}`
      );
      url.searchParams.append("page", String(page));
      const res = await fetch(getUrlWithUID({ url, ctx }), {
        headers: getHeaders(ctx),
      });
      if (!res.ok) {
        throw new Error("Error fetching conversation");
      }
      return res.json();
    }),
  deleteConversation: t.procedure
    .input(deleteConversationSchema)
    .mutation(async ({ ctx, input }): Promise<null> => {
      const { botId, conversationId } = input;
      const url = new URL(
        `${env.BACKEND_BASE_URL}/bots/${botId}/conversations/${conversationId}`
      );
      const res = await fetch(getUrlWithUID({ url, ctx }), {
        headers: getHeaders(ctx),
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error deleting conversation");
      }
      return res.json();
    }),
  createConversation: t.procedure
    .input(createConversationSchema)
    .mutation(async ({ ctx, input }): Promise<Conversation> => {
      const { botId } = input;
      const res = await fetch(`${env.BACKEND_BASE_URL}/bots/${botId}/conversations`, {
        headers: getHeaders(ctx),
        method: "POST",
        body: JSON.stringify({ user_id: ctx.user.id })
      });
      if (!res.ok) {
        throw new Error("Error deleting conversation");
      }
      return res.json();
    }),
  sendMessage: t.procedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }): Promise<SendMessageRes> => {
      const { botId, conversationId, message } = input;
      const url = new URL(`${env.BACKEND_BASE_URL}/chat/${botId}`);
      const res = await fetch(getUrlWithUID({ url, ctx }), {
        headers: getHeaders(ctx),
        method: "POST",
        body: JSON.stringify({
          message,
          session_id: conversationId,
          user_id: ctx.user.id,
        }),
      });
      if (!res.ok) {
        throw new Error("Error sending message");
      }
      return res.json()
    }),
});
