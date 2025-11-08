import type z from "zod";
import type { attachmentSchema, createBotSchema } from "~/trpc/schemas";
import type { updateBotSchema } from "~/trpc/schemas/bot";

export interface Bot {
  id: string;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  config: Config;
  metadata: Metadata;
  model: Model;
}

export interface Config {
  temperature: number;
  max_tokens: number;
  complexity: "simple" | "intermediate" | "advanced";
  response_length: "short" | "medium" | "long";
  friendliness: "neutral" | "friendly" | "formal";
  instructions: string;
}

export interface Metadata {
  "propertyName*": string;
}

export interface Model {
  id: string;
  code: string;
  name: string;
  provider: string;
  icon_url: string;
  temperature: number;
  supports_reasoning: boolean;
}

export type BotBlueprint = z.infer<typeof createBotSchema>;

export type Attachment = z.infer<typeof attachmentSchema>;

export type UpdateBot = z.infer<typeof updateBotSchema>;

export interface CreateBotOption {
  title: string;
  description?: string;
  value: string;
  imageUrl?: string;
}

export interface CreateBotResponse {
  blueprint: Blueprint;
  documents: Document[];
}

export interface Blueprint {
  bot_id: string;
  name: string;
  description: string;
  temperature: number;
  max_tokens: number;
  complexity: string;
  response_length: string;
  friendliness: string;
  system_prompt: string;
  model_id: string;
}

export interface Document {
  document_id: string;
  filename: string;
  blob_path: string;
  blob_url: string;
  status: string;
}
