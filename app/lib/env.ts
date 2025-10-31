import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_BASE_URL: z.string(),
  },

  client: {
    // VITE_API_URL: z.string(),
  },
  clientPrefix: "VITE_",

  runtimeEnv: {
    // VITE_API_URL: import.meta.env.VITE_API_URL,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL
  },
  emptyStringAsUndefined: true,
});
