"use client";

import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Option = { value: string; label: string };

interface FormSelectProps<TFormValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  placeholder?: string;
  options: Option[];
  className?: string;
}

export function FormSelect<TFormValues extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder = "Seleccionar opción",
  options,
  className,
}: FormSelectProps<TFormValues>) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Select
              value={String(field.value)}
              onValueChange={(v) => field.onChange(v)}
            >
              <SelectTrigger className="w-full border-[#8794C4]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-destructive text-xs">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
