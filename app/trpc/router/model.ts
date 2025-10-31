import { initTRPC } from "@trpc/server";
import type { Context } from "../context";
import { env } from "~/lib/env";
import type { GetModelRes, Model } from "~/types";

const t = initTRPC.context<Context>().create();

export const modelRouter = t.router({
  getAllModels: t.procedure.query(async ({ctx}): Promise<Model[]> => {
    const res = await fetch(`${env.BACKEND_BASE_URL}/models`, {
      headers: { "x-api-key": ctx.apiKey}
    });
    if (!res.ok) {
      throw new Error("Error fetching models");
    }
    const data: GetModelRes = await res.json();
    return data.models;
  })
})