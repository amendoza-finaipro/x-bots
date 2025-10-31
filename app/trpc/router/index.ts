import { initTRPC } from "@trpc/server";
import type { Context } from "../context";
import { modelRouter } from "./model";
import { botRouter } from "./bot";
import { conversationRouter } from "./conversations";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  model: modelRouter,
  bot: botRouter,
  conversation: conversationRouter,
});

export type AppRouter = typeof appRouter;
