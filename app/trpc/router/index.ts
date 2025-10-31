import { initTRPC } from "@trpc/server";
import type { Context } from "../context";
import { modelRouter } from "./model";
import { botRouter } from "./bot";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  model: modelRouter,
  bot: botRouter,
});

export type AppRouter = typeof appRouter;
