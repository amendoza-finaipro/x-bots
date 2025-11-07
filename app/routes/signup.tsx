import { Link } from "react-router";
import { SignupForm } from "app/components/signup/SignupForm";
import { LoginGoogleButton } from "app/components/login/LoginGoogleButton";

export default function SignupPage() {
  return (
    <main className="bg-dark-blue-50 flex min-h-screen items-center justify-center p-2 py-6">
      <div className="w-full max-w-90 rounded-lg border-2 p-5 shadow-xl sm:max-w-160">
        <h1 className="pb-6 text-center text-[1.4375rem] font-bold">Crear cuenta</h1>
        <SignupForm />
        <div className="flex items-center gap-2 pb-5">
          <div className="h-1px flex-1 bg-[#6C757D]" />
          O
          <div className="h-1px flex-1 bg-[#6C757D]" />
        </div>
        <LoginGoogleButton />
        <div className="pt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
