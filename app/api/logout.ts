import { auth } from "~/lib/auth";

export async function POST(request: Request) {
console.log('Logging out');
  await auth.api.signOut({ headers: request.headers });
  return new Response("ok", { status: 200 });
}
