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

export const updateBotSchema = z.object({
  botId: z.string(),
  complexity: z.enum(["simple", "intermediate", "advanced"]),
  friendliness: z.enum(["neutral", "friendly", "formal"]),
  instructions: z.string(),
  max_tokens: z.int(),
  model_id: z.string(),
  response_length: z.enum(["short", "medium", "long"]),
  temperature: z.number().min(0).max(1),
});

export const getBotDetailSchema = z.object({
  botId: z.string(),
});

export const getDocumentsByBotSchema = z.object({
  botId: z.string(),
});

export const deleteDocumentSchema = z.object({
  documentId: z.string(),
});

export const addBotDocumentSchema = z.object({
  bot_id: z.string(),
  filename: z.string(),
  content_base64: z.string(),
  content_type: z.string(),
  size_bytes: z.number(),
});
