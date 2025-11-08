import { redirect } from "react-router";
import { tr } from "zod/v4/locales";
import { auth } from "~/lib/auth";
import { env } from "~/lib/env";
import { signJWT } from "~/lib/sign-jwt";

type CreateContextOptions = {
  request: Request;
};

export async function createContext({ request }: CreateContextOptions) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || !session.user) { 
    redirect("/"); 
    throw new Error("Unauthenticated");
  }
  const userData = session.user;
  const user = { id: userData.id, email: userData.email, name: userData.name }

  const jwt = signJWT({ user_id: user.id }, env.JWT_SECRET);

  return {
    user,
    apiKey: env.API_KEY,
    token: jwt,
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
