import { createAuthClient } from "better-auth/client";

export const {
  useSession,
  signIn,
  signOut,
  signUp,
  forgetPassword,
  resetPassword
} = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_URL ?? "http://localhost:5173",
});
