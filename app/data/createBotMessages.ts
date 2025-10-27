import { chatbotImage } from "@/components/assets/images";
import type { MessageType } from "~/types";

export const createBotMessages: MessageType[] = [
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
    value: "Selecciona la complejidad del bot",
    expectedAnswer: "selection",
    name: "Assistant",
    avatar: chatbotImage,
    options: [
      {
        title: "Simple",
        description: "Respuestas rápidas para tareas sencillas.",
        value: "simple"
      },
      {
        title: "Intermedia",
        description: "Razonamiento equilibrado para la mayoría de flujos.",
        value: "intermedia"
      },
      {
        title: "Avanzada",
        description: "Síntesis profunda para instrucciones complejas.",
        value: "avanzada"
      },
    ],
  },
  {
    key: 5,
    value: "Selecciona el tono del bot",
    expectedAnswer: "selection",
    name: "Assistant",
    avatar: chatbotImage,
    options: [
      {
        title: "Neutral",
        description: "Tono directo y profesional.",
        value: "neutral"
      },
      {
        title: "Amigable",
        description: "Personalidad cercana y entusiasta.",
        value: "amigable"
      },
      {
        title: "Formal",
        description: "Estilo corporativo y estructurado.",
        value: "formal"
      },
    ],
  },
  {
    key: 6,
    value: "Selecciona la longitud de respuesta",
    expectedAnswer: "selection",
    name: "Assistant",
    avatar: chatbotImage,
    options: [
      {
        title: "Corta",
        description: "De una a tres oraciones.",
        value: "corta"
      },
      {
        title: "Media",
        description: "Dos párrafos breves ideales para resúmenes.",
        value: "media"
      },
      {
        title: "Larga",
        description: "Respuestas detalladas con pasos y matices.",
        value: "larga"
      },
    ],
  },
  {
    key: 7,
    value:
      "Entendido. Ahora, Sube hasta tres fuentes de conocimiento para este bot. Aceptamos PDF, DOCX, PPTX, XLSX y XLS.",
    expectedAnswer: "file",
    name: "Assistant",
    avatar: chatbotImage,
  },
  {
    key: 8,
    value: "Archivos recibidos. Voy a generar el bot con la información proporcionada",
    name: "Assistant",
    avatar: chatbotImage,
  },
];
