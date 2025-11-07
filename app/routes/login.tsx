import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoginForm } from "~/components/login/LoginForm";
import { LoginGoogleButton } from "~/components/login/LoginGoogleButton";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (searchParams.get("error") === "login_required") {
      toast.error("Inicia sesión primero");
    }
  }, [mounted, searchParams]);

  return (
    <main className="bg-dark-blue-50 flex h-screen items-center justify-center p-2">
      <div className="w-full max-w-90 rounded-lg border-2 p-5 shadow-xl">
        <h1 className="pb-6 text-center text-[1.4375rem] font-bold">Iniciar sesión</h1>
        <LoginForm />
        <div className="flex items-center gap-2 pb-5">
          <div className="h-1px flex-1 bg-[#6C757D]" />
          O
          <div className="h-1px flex-1 bg-[#6C757D]" />
        </div>
        <LoginGoogleButton />
        <div className="pt-4 text-center">
          ¿No tienes cuenta?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Regístrate
          </Link>
        </div>
      </div>
    </main>
  );
}
