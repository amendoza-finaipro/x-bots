export interface MessageType {
  key: number;
  value: string;
  name: string;
  avatar: string;  
  expectedAnswer?: answerTypes;
  options?: MessageOptionType[];
}

export interface MessageNoKey {
  value: string;
  name: string;
  avatar: string;
}

export interface MessageOptionType {
  title: string;
  description: string;
  value: string
}

export type answerTypes = "text" | "selection" | "file" | "no-answer";