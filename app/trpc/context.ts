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

export function getUrlWithAK({ url, ctx }: { url: URL; ctx: Context }) {
  url.searchParams.append("user_id", ctx.user.id);
  return url;
}

export function getHeaders(ctx: Context) {
  return { 
    "x-api-key": ctx.apiKey, 
    "Content-Type": "application/json" 
  };
}
