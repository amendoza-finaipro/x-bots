"use client";


import { GoogleLogoIcon } from "@/components/assets/icons";
import { Button } from "~/components/ui/button";
import { signIn } from "~/lib/auth-client";

export const LoginGoogleButton = () => {
  const signInGoogle = async () => {
    try {
      await signIn.social({
        provider: "google",
        errorCallbackURL: "/",
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Button
      className="h-11.5 w-full rounded bg-[#5086EC] px-2 text-white"
      onClick={signInGoogle}
    >
      <div className="size-8 bg-white p-1">
        <GoogleLogoIcon className="size-full" />
      </div>
      <span className="flex-1 pr-7">Ingresar con Google</span>
    </Button>
  );
};
