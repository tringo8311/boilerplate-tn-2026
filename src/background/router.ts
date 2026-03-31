import type { AppMessage, AppResponse, Feature } from '../shared/messages';

type HandlerFunc = (payload: any, sender: chrome.runtime.MessageSender) => Promise<any>;

export class MessageRouter {
  private handlers: Map<string, HandlerFunc> = new Map();

  constructor() {}

  public register(feature: Feature, action: string, handler: HandlerFunc) {
    this.handlers.set(`${feature}:${action}`, handler);
  }

  public async handleMessage(
    message: AppMessage,
    sender: chrome.runtime.MessageSender
  ): Promise<AppResponse> {
    try {
      const key = `${message.feature}:${message.action}`;
      const handler = this.handlers.get(key);

      if (!handler) {
        return {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `No handler for ${key}`,
          },
        };
      }

      const data = await handler(message.payload, sender);
      return { success: true, data };
    } catch (error: any) {
      console.error('Message routing error:', error);
      return {
        success: false,
        error: {
          code: error.code || 'INTERNAL_ERROR',
          message: error.message || 'Unknown error occurred',
        },
      };
    }
  }
}

export const router = new MessageRouter();
