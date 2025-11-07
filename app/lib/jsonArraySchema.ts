import { z } from "zod";

export const jsonArraySchema = z
  .string()
  .transform((val, ctx) => {
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "The value must be an array JSON",
        });
        return z.NEVER;
      }

      return parsed;
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The value is not a valid JSON",
      });
      return z.NEVER;
    }
  })
  .pipe(z.array(z.string().url()));
