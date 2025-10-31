import { initTRPC } from "@trpc/server";
import { getHeaders, getUrlWithAK, type Context } from "../context";
import { env } from "~/lib/env";
import { getAllConversationsSchema } from "../schemas";
import type { Conversation } from "~/types/Conversation";

const t = initTRPC.context<Context>().create();

export const conversationRouter = t.router({
  getAllConversations: t.procedure
    .input(getAllConversationsSchema)
    .query(async ({ ctx, input }): Promise<{ conversations: Conversation[] }> => {
      const url = new URL(`${env.BACKEND_BASE_URL}/bots/${input.botId}/conversations`);
      const res = await fetch(getUrlWithAK({ url, ctx }), {
        headers: getHeaders(ctx),
      });
      if (!res.ok) {
        throw new Error("Error fetching conversations");
      }
      return res.json();
    }),
});
