export interface Conversation {
  conversation_id: string;
  bot_id: string;
  user_id: string;
  title: string;
  summary: string;
  language: string;
  created_at: Date;
  updated_at: Date;
  last_summary_at: Date;
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
  created_at: Date;
  user_goals: string[];
  assistant_commitments: string[];
}

export interface Message {
  id: string;
  role: string;
  content: string;
  created_at: Date;
}
