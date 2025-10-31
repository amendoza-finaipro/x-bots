export interface Model {
  id: string;
  code: string;
  name: string;
  provider: string;
  deployment_name: string;
  temperature: number;
  icon_url: string;
  supports_reasoning: boolean;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface GetModelRes {
  models: Model[];
}
