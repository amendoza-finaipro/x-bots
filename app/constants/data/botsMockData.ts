import type { Bot } from "~/types";

export const botsMockData: Bot[] = [
  {
    id: "bot_001",
    user_id: "user_123",
    name: "Support Assistant",
    description: "Un bot diseñado para responder preguntas frecuentes de los clientes.",
    created_at: "2025-03-10T10:15:00Z",
    updated_at: "2025-04-02T14:20:00Z",
    config: {
      temperature: 0.7,
      max_tokens: 1500,
      complexity: "medium",
      response_length: "short",
      friendliness: "friendly",
      instructions:
        "Responde de forma clara, empática y profesional. Mantén las respuestas concisas y útiles.",
    },
    metadata: {
      "propertyName*": "metadata"
    },
    model: {
      id: "model_gpt4",
      code: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      provider: "OpenAI",
      icon_url: "https://cdn.openai.com/icons/gpt-4.svg",
      temperature: 0.7,
      supports_reasoning: true,
    },
  },
  {
    id: "bot_002",
    user_id: "user_456",
    name: "Creative Writer",
    description: "Un bot enfocado en generar historias y contenido creativo.",
    created_at: "2025-05-12T08:45:00Z",
    updated_at: "2025-06-01T16:30:00Z",
    config: {
      temperature: 0.95,
      max_tokens: 2500,
      complexity: "high",
      response_length: "long",
      friendliness: "expressive",
      instructions:
        "Escribe de manera creativa, con un tono emocional y narrativo. Utiliza descripciones ricas y metáforas.",
    },
    metadata: {
      "propertyName*": "metadata"
    },
    model: {
      id: "model_gemini",
      code: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google DeepMind",
      icon_url: "https://cdn.deepmind.com/icons/gemini.svg",
      temperature: 0.95,
      supports_reasoning: false,
    },
  },
];
