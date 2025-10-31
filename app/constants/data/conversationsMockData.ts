import type { Conversation } from "~/types/Conversation";

export const conversationsMockData: Conversation[] = [
  {
    conversation_id: "conv_001",
    bot_id: "bot_001",
    user_id: "user_123",
    title: "Asistencia con el pedido #4521",
    summary:
      "El usuario consultó sobre el estado de su pedido y el bot le ayudó a rastrearlo, confirmando la entrega para el día siguiente.",
    language: "es",
    created_at: new Date("2025-03-14T09:10:00Z"),
    updated_at: new Date("2025-03-14T09:45:00Z"),
    last_summary_at: new Date("2025-03-14T09:46:00Z"),
    memories: [
      {
        content:
          "El usuario suele preguntar sobre el estado de sus pedidos y prefiere recibir notificaciones por correo electrónico.",
        language: "es",
        created_at: new Date("2025-03-01T12:00:00Z"),
        user_goals: [
          "Recibir actualizaciones precisas sobre pedidos",
          "Evitar tener que contactar soporte humano",
        ],
        assistant_commitments: [
          "Mantener un tono amable y profesional",
          "Dar respuestas claras sobre el estado del pedido",
        ],
      },
    ],
    messages: [
      {
        id: "msg_001",
        role: "user",
        content: "Hola, ¿podrías decirme cuándo llegará mi pedido #4521?",
        created_at: new Date("2025-03-14T09:12:00Z"),
      },
      {
        id: "msg_002",
        role: "assistant",
        content:
          "Claro 😊 Tu pedido #4521 fue enviado ayer y está programado para entregarse mañana antes de las 6 p.m.",
        created_at: new Date("2025-03-14T09:13:00Z"),
      },
      {
        id: "msg_003",
        role: "user",
        content: "Perfecto, muchas gracias por la información.",
        created_at: new Date("2025-03-14T09:14:00Z"),
      },
    ],
    messages_total: 3,
    page: 1,
    page_size: 10,
    total_pages: 1,
  },
  {
    conversation_id: "conv_002",
    bot_id: "bot_002",
    user_id: "user_456",
    title: "Creación de historia fantástica",
    summary:
      "El usuario pidió al bot una historia sobre un dragón que protege un bosque. El bot creó un relato poético y simbólico.",
    language: "es",
    created_at: new Date("2025-06-02T16:00:00Z"),
    updated_at: new Date("2025-06-02T16:40:00Z"),
    last_summary_at: new Date("2025-06-02T16:41:00Z"),
    memories: [
      {
        content:
          "El usuario disfruta las historias con tono épico y descripciones detalladas. Prefiere finales optimistas.",
        language: "es",
        created_at: new Date("2025-05-20T11:30:00Z"),
        user_goals: ["Inspirarse para escribir relatos propios"],
        assistant_commitments: [
          "Usar lenguaje poético y visual",
          "Evocar emociones con descripciones ricas",
        ],
      },
    ],
    messages: [
      {
        id: "msg_101",
        role: "user",
        content: "Escríbeme una historia sobre un dragón que protege un bosque mágico.",
        created_at: new Date("2025-06-02T16:02:00Z"),
      },
      {
        id: "msg_102",
        role: "assistant",
        content:
          "Bajo la aurora del amanecer, un dragón esmeralda vigilaba el bosque donde los árboles susurraban nombres antiguos...",
        created_at: new Date("2025-06-02T16:05:00Z"),
      },
      {
        id: "msg_103",
        role: "user",
        content: "Hermoso. ¿Podrías continuar con un final esperanzador?",
        created_at: new Date("2025-06-02T16:20:00Z"),
      },
      {
        id: "msg_104",
        role: "assistant",
        content:
          "Cuando el sol renació, el dragón extendió sus alas sobre un bosque en paz, sabiendo que su propósito había sido cumplido.",
        created_at: new Date("2025-06-02T16:25:00Z"),
      },
    ],
    messages_total: 4,
    page: 1,
    page_size: 10,
    total_pages: 1,
  },
];
