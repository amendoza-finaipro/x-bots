import { initTRPC } from "@trpc/server";
import type { Context } from "../context";
import { env } from "~/lib/env";
import type { CreateBotResponse, GetModelRes, Model } from "~/types";
import z, { string } from "zod";
import { createBotSchema } from "../schemas";

const t = initTRPC.context<Context>().create();

export const botRouter = t.router({
  createBot: t.procedure
    .input(createBotSchema)
    .mutation(async ({ ctx, input }): Promise<CreateBotResponse> => {
      const res = await fetch(`${env.BACKEND_BASE_URL}/orchestrator/chat`, {
        headers: { "x-api-key": ctx.apiKey, "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({...input, user_id: ctx.user.id}),
      });
      if (!res.ok) {
        throw new Error("Error creating bot");
      }
      return res.json();
    }),
});
