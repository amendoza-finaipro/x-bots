import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: React.ComponentProps<"input">["type"];
}

export const FormInput = <T extends FieldValues,>({ form, name, label, placeholder, type = "text" }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-1.5 w-full h-full">
          <FormLabel className="font-semibold">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className="border-[#8794C4] bg-white h-9"
              {...field}
              value={field.value as string}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
