import z from "zod";

export const getAllConversationsSchema = z.object({
  botId: z.string(),
})