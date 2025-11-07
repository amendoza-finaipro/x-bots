import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

export const FormCheckbox = <T extends FieldValues,>({ form, label, name }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem >
          <div className="flex gap-2">
            <FormControl>
              <Checkbox
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none text-dark-blue-200">
              <FormLabel>{label}</FormLabel>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
