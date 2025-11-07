export interface Conversation {
  conversation_id: string;
  bot_id: string;
  user_id: string;
  title: string | null;
  summary: string;
  language: string;
  created_at: string;
  updated_at: string;
  last_summary_at: string;
  memories: Memory[];
  messages: Message[];
  messages_total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface Memory {
  content: string;
  language: string;
  created_at: string;
  user_goals: string[];
  assistant_commitments: string[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface SendMessageRes {
  session_id: string;
  messages: SendMessageResItem[];
}

export interface SendMessageResItem {
  role: string;
  content: string;
}
