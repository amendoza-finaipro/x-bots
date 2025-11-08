import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BACKEND_BASE_URL: z.string(),

    BETTER_AUTH_DB_SERVER: z.string(),
    BETTER_AUTH_DB_USER: z.string(),
    BETTER_AUTH_DB_PASSWORD: z.string(),
    BETTER_AUTH_DB_NAME: z.string(),
    BETTER_AUTH_DB_PORT: z.string(),
    BETTER_AUTH_DB_SSL: z.string(),

    AZURE_COMMUNICATION_EMAIL_ENDPOINT: z.string(),
    AZURE_COMMUNICATION_EMAIL_ACCESS_KEY: z.string(),

    API_KEY: z.string(),
    JWT_SECRET: z.string(),
  },

  client: {
    // VITE_API_URL: z.string(),
  },
  clientPrefix: "VITE_",

  runtimeEnv: {
    // VITE_API_URL: import.meta.env.VITE_API_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,

    BETTER_AUTH_DB_SERVER: process.env.BETTER_AUTH_DB_SERVER,
    BETTER_AUTH_DB_USER: process.env.BETTER_AUTH_DB_USER,
    BETTER_AUTH_DB_PASSWORD: process.env.BETTER_AUTH_DB_PASSWORD,
    BETTER_AUTH_DB_NAME: process.env.BETTER_AUTH_DB_NAME,
    BETTER_AUTH_DB_PORT: process.env.BETTER_AUTH_DB_PORT,
    BETTER_AUTH_DB_SSL: process.env.BETTER_AUTH_DB_SSL,

    AZURE_COMMUNICATION_EMAIL_ENDPOINT: process.env.AZURE_COMMUNICATION_EMAIL_ENDPOINT,
    AZURE_COMMUNICATION_EMAIL_ACCESS_KEY: process.env.AZURE_COMMUNICATION_EMAIL_ACCESS_KEY,

    API_KEY: process.env.API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  emptyStringAsUndefined: true,
});
