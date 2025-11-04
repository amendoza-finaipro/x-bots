import z from "zod";

export const getAllConversationsSchema = z.object({
  botId: z.string(),
});

export const deleteConversationSchema = z.object({
  botId: z.string(),
  conversationId: z.string(),
});

export const getConversationByIdSchema = z.object({
  botId: z.string(),
  conversationId: z.string(),
  page: z.number(),
});

export const sendMessageSchema = z.object({
  botId: z.string(),
  conversationId: z.string(),
  message: z.string(),
})
