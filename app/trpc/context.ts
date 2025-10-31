import { userMockData } from "~/data";

type CreateContextOptions = {
  request: Request;
};

export async function createContext({ request }: CreateContextOptions) {
  // TODO: fetch user and apiKey from autentication
  const user = userMockData;

  return {
    user,
    apiKey: "1234567890",
    request,
  };
}

// Exporta el tipo para usarlo en initTRPC
export type Context = Awaited<ReturnType<typeof createContext>>;
