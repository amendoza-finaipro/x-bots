import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { formSchema } from "./formSchema";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";

import { formDefaultValues } from "./formDefaultValues";

import { FormCheckbox, FormInput } from "../auth-form";

import { toast } from "sonner";

import { useNavigate } from "react-router";
import { signIn } from "~/lib/auth-client";
import { sendToast } from "~/lib/sendToast";
import { SpinnerIcon } from "@/components/assets/icons";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: formDefaultValues,
    resolver: standardSchemaResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifying = new URLSearchParams(window.location.search).get(
      "verifying",
    );
    if (verifying) {
      setTimeout(() => {
        sendToast({
          variant: "success",
          title: "Email verificado",
          message: "Inicia sesión con tu nueva cuenta",
        });
      }, 0);
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn.email(
      { ...values },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          toast.success("Sesión iniciada exitosamente");
          navigate("/");
        },
        onError: (ctx) => {
          if (ctx.error.message === "Invalid email or password") {
            toast.error("Credenciales inválidas");
            return;
          }
          toast.error("Ha ocurrido un error inesperado");
        },
      },
    );
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pb-5"
      >
        <div className="space-y-5 pb-3">
          <FormInput
            form={form}
            label="Correo electrónico"
            name="email"
            placeholder="Ingresa tu correo"
          />
          <FormInput
            form={form}
            label="Contraseña"
            name="password"
            placeholder="Ingresa tu contraseña"
            type="password"
          />
          <FormCheckbox
            form={form}
            label="Mantener la sesión iniciada"
            name="rememberMe"
          />
        </div>
        <Link
          to="/login/password-recovery"
          className="block w-fit pb-2 text-blue-400 underline"
        >
          ¿Olvidaste la contraseña?
        </Link>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading && <SpinnerIcon className="size-4" />}
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
};
