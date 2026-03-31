export type Feature = 'auth' | 'scraper' | 'settings';
export type Action = string;

export interface AppMessage<T = any> {
  feature: Feature;
  action: Action;
  payload: T;
}

export interface AppResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
