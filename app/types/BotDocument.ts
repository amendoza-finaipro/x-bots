import z from "zod";
import type { addBotDocumentSchema } from "~/trpc/schemas";

export interface BotDocument {
  id: string;
  bot_id: string;
  user_id: string;
  filename: string;
  blob_path: string;
  blob_url: string;
  content_type: string;
  size_bytes: number;
  status: string;
  uploaded_at: Date;
  chunk_ids: string[];
  error: string;
}

export type BotDocumentBody = z.infer<typeof addBotDocumentSchema>
