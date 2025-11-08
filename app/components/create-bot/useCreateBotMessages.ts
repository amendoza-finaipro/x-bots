import { chatbotImage } from "@/components/assets/images";
import { complexityOptions, friendlinessOptions, responseLengthOptions } from "~/constants";
import { trpc } from "~/trpc/client";
import type { MessageType } from "~/types";

export const useCreateBotMessages = () => {
  const { data: models } = trpc.model.getAllModels.useQuery();

  const botMessages: MessageType[] = [
      {
        key: 1,
        value:
          "¡Hola! Soy el fabricante de X-Bots. Cuéntame sobre el asistente que quieres construir y qué significa el éxito.",
        expectedAnswer: "text",
        name: "Assistant",
        avatar: chatbotImage,
      },
      {
        key: 3,
        value:
          "¡Excelente idea! Ahora definamos cómo debe comportarse en las conversaciones.",
        expectedAnswer: "no-answer",
        name: "Assistant",
        avatar: chatbotImage,
      },
      {
        key: 4,
        value: "Selecciona el modelo a utilizar",
        expectedAnswer: "selection",
        name: "Assistant",
        avatar: chatbotImage,
        options: models?.map((model) => ({
          title: model.name,
          value: model.id,
          imageUrl: model.icon_url
        })),
      },
      {
        key: 5,
        value: "Selecciona la complejidad del bot",
        expectedAnswer: "selection",
        name: "Assistant",
        avatar: chatbotImage,
        options: complexityOptions,
      },
      {
        key: 6,
        value: "Selecciona el tono del bot",
        expectedAnswer: "selection",
        name: "Assistant",
        avatar: chatbotImage,
        options: friendlinessOptions,
      },
      {
        key: 7,
        value: "Selecciona la longitud de respuesta",
        expectedAnswer: "selection",
        name: "Assistant",
        avatar: chatbotImage,
        options: responseLengthOptions,
      },
      {
        key: 8,
        value:
          "Entendido. Ahora, Sube hasta tres fuentes de conocimiento para este bot. Aceptamos PDF, DOCX, PPTX, XLSX y XLS.",
        expectedAnswer: "file",
        name: "Assistant",
        avatar: chatbotImage,
      },
      {
        key: 9,
        value:
          "Archivos recibidos. Voy a generar el bot con la información proporcionada",
        name: "Assistant",
        avatar: chatbotImage,
      },
    ]

  return {
    botMessages,
  };
};
