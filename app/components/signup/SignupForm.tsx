"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { formSchema } from "./formSchema";

import { SpinnerIcon } from "@/components/assets/icons";
import { signUp } from "~/lib/auth-client";
import { FormCheckbox, FormInput } from "../auth-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { formDefaultValues } from "./formDefaultValues";

export const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: formDefaultValues,
    resolver: standardSchemaResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // await signUp.email(
    //   { ...values, callbackURL: "/login?verifying=true" },
    //   {
    //     onRequest: () => setIsLoading(true),
    //     onSuccess: () => {
    //       toast.info(
    //         `Hemos enviado un link a ${values.email} para que puedas verificar tu email`,
    //         { dismissible: true, duration: Infinity },
    //       );
    //       navigate("/");
    //     },
    //     onError: (ctx) => {
    //       if (ctx.error.message === "User already exists") {
    //         form.setError("email", {
    //           message: "Ya existe un usuario con este email",
    //         });
    //         return;
    //       }
    //       toast.error("Hubo un error inesperado");
    //     },
    //   },
    // );
    console.log(values);
    setIsLoading(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 pb-5"
      >
        <div className="flex flex-col gap-x-2 gap-y-5 sm:flex-row">
          <FormInput
            form={form}
            label="Nombre"
            name="name"
            placeholder="Ingresa tu nombre"
          />
        </div>
        <FormInput
          form={form}
          label="Correo electrónico"
          name="email"
          placeholder="Ingresa tu correo"
        />
        <div className="flex flex-col gap-x-2 gap-y-5 sm:flex-row">
          <FormInput
            form={form}
            label="Contraseña"
            name="password"
            placeholder="Ingresa tu contraseña"
            type="password"
          />
          <FormInput
            form={form}
            label="Confirmar contraseña"
            name="confirmPassword"
            placeholder="Ingresa tu contraseña nuevamente"
            type="password"
          />
        </div>
        <FormCheckbox
          form={form}
          label="He leído los Términos y Condiciones"
          name="termsRead"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading && <SpinnerIcon className="size-5" />}
          Crear cuenta
        </Button>
      </form>
    </Form>
  );
};
