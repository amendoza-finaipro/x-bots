export interface Bot {
  id: string;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  config: Config;
  metadata: Metadata;
  model: Model;
}

export interface Config {
  temperature: number;
  max_tokens: number;
  complexity: string;
  response_length: string;
  friendliness: string;
  instructions: string;
}

export interface Metadata {
  "propertyName*": string;
}

export interface Model {
  id: string;
  code: string;
  name: string;
  provider: string;
  icon_url: string;
  temperature: number;
  supports_reasoning: boolean;
}
