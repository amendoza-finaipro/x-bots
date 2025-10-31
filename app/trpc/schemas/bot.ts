import z from "zod";

export const attachmentSchema = z.object({
  filename: z.string(),
  content_base64: z.string(),
  content_type: z.string(),
  size_bytes: z.number(),
});

export const createBotSchema = z.object({
  message: z.string(),
  attachments: z.array(attachmentSchema),
  complexity: z.enum(["simple", "intermediate", "advanced"]),
  friendliness: z.enum(["neutral", "friendly", "formal"]),
  model_id: z.string(),
  response_length: z.enum(["short", "medium", "long"]),
});
