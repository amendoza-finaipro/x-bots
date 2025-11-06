import { initTRPC } from "@trpc/server";
import { getHeaders, getUrlWithUID, type Context } from "../context";
import { env } from "~/lib/env";
import type { CreateBotResponse, Bot, BotDocument } from "~/types";
import { addBotDocumentSchema, createBotSchema, deleteDocumentSchema, getDocumentsByBotSchema } from "../schemas";

const t = initTRPC.context<Context>().create();

export const botRouter = t.router({
  createBot: t.procedure
    .input(createBotSchema)
    .mutation(async ({ ctx, input }): Promise<CreateBotResponse> => {
      const res = await fetch(`${env.BACKEND_BASE_URL}/orchestrator/chat`, {
        headers: getHeaders(ctx),
        method: "POST",
        body: JSON.stringify({ ...input, user_id: ctx.user.id }),
      });
      if (!res.ok) {
        throw new Error("Error creating bot");
      }
      return res.json();
    }),
  getAllBots: t.procedure.query(async ({ ctx }): Promise<{ bots: Bot[] }> => {
    const url = new URL(`${env.BACKEND_BASE_URL}/bots`);
    const res = await fetch(getUrlWithUID({ url, ctx }), {
      headers: getHeaders(ctx),
    });
    if (!res.ok) {
      throw new Error("Error fetching bots");
    }
    return res.json();
  }),
  getBotDocuments: t.procedure
    .input(getDocumentsByBotSchema)
    .query(async ({ input, ctx }): Promise<{ documents: BotDocument[] }> => {
      const url = new URL(`${env.BACKEND_BASE_URL}/documents/bots/${input.botId}`);
      const res = await fetch(getUrlWithUID({ url, ctx }), {
        headers: getHeaders(ctx),
      });
      if (!res.ok) {
        throw new Error("Error fetching bot documents");
      }
      return res.json();
    }),
  addBotDocument: t.procedure
    .input(addBotDocumentSchema)
    .mutation(async ({ input, ctx }): Promise<BotDocument> => {
      const body = {...input, user_id: ctx.user.id}
      const res = await fetch(`${env.BACKEND_BASE_URL}/documents`, {
        headers: getHeaders(ctx),
        method: "POST",
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        throw new Error("Error adding document");
      }
      return res.json();
    }),
  deleteBotDocument: t.procedure
    .input(deleteDocumentSchema)
    .mutation(async ({ input, ctx }): Promise<BotDocument> => {
      const url = new URL(`${env.BACKEND_BASE_URL}/documents/${input.documentId}`);
      const res = await fetch(getUrlWithUID({ url, ctx }), {
        headers: getHeaders(ctx),
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error deleting document");
      }
      return res.json();
    }),
});
