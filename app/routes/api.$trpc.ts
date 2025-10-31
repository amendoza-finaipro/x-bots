import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "~/trpc/context";
import { appRouter } from "~/trpc/router";

export const loader = async ({ request }: { request: Request }) => {
  return fetchRequestHandler({
    endpoint: "/api",
    req: request,
    router: appRouter,
    createContext: () => createContext({ request }),
  });
};

export const action = loader;
