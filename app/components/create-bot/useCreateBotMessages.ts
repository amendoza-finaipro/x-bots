import { chatbotImage } from "@/components/assets/images";
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
        options: [
          {
            title: "Simple",
            description: "Respuestas rápidas para tareas sencillas.",
            value: "simple",
          },
          {
            title: "Intermedia",
            description: "Razonamiento equilibrado para la mayoría de flujos.",
            value: "intermediate",
          },
          {
            title: "Avanzada",
            description: "Síntesis profunda para instrucciones complejas.",
            value: "advanced",
          },
        ],
      },
      {
        key: 6,
        value: "Selecciona el tono del bot",
        expectedAnswer: "selection",
        name: "Assistant",
        avatar: chatbotImage,
        options: [
          {
            title: "Neutral",
            description: "Tono directo y profesional.",
            value: "neutral",
          },
          {
            title: "Amigable",
            description: "Personalidad cercana y entusiasta.",
            value: "friendly",
          },
          {
            title: "Formal",
            description: "Estilo corporativo y estructurado.",
            value: "formal",
          },
        ],
      },
      {
        key: 7,
        value: "Selecciona la longitud de respuesta",
        expectedAnswer: "selection",
        name: "Assistant",
        avatar: chatbotImage,
        options: [
          {
            title: "Corta",
            description: "De una a tres oraciones.",
            value: "short",
          },
          {
            title: "Media",
            description: "Dos párrafos breves ideales para resúmenes.",
            value: "medium",
          },
          {
            title: "Larga",
            description: "Respuestas detalladas con pasos y matices.",
            value: "long",
          },
        ],
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
