import { redirect } from "react-router";
import { auth } from "~/lib/auth";
import type { Route } from "./+types/logout";

export const loader = async ({ request }: Route.ActionArgs) => {
  await auth.api.signOut({ headers: request.headers });
  return redirect("/");
};

export default function Logout() {
  return null;
}
