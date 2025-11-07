import { userMockData } from "~/constants/data";

type CreateContextOptions = {
  request: Request;
};

export async function createContext({ request }: CreateContextOptions) {
  // TODO: fetch user, apiKey and token from autentication
  const user = userMockData;

  return {
    user,
    apiKey: "1234567890",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiZXhwIjoxNzk0MDY0OTYwfQ.IrtX8yEIUj4WQ_9buwYXa5i6d5ohjkOnMWx123N_HTM",
    request,
  };
}

// Exporta el tipo para usarlo en initTRPC
export type Context = Awaited<ReturnType<typeof createContext>>;

export function getUrlWithUID({ url, ctx }: { url: URL; ctx: Context }) {
  url.searchParams.append("user_id", ctx.user.id);
  return url;
}

export function getHeaders(ctx: Context) {
  return { 
    "x-api-key": ctx.apiKey, 
    "Authorization": `Bearer ${ctx.token}`,
    "Content-Type": "application/json" 
  };
}
