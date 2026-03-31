import type { AppMessage, AppResponse } from './messages';

export class MessageBus {
  public static async send<T = any, R = any>(message: AppMessage<T>): Promise<AppResponse<R>> {
    try {
      const response = await chrome.runtime.sendMessage(message);
      return response as AppResponse<R>;
    } catch (error: any) {
      console.error('MessageBus send error:', error);
      return {
        success: false,
        error: {
          code: 'CONNECTION_ERROR',
          message: error.message || 'Failed to send message',
        },
      };
    }
  }

  public static onMessage(handler: (message: AppMessage, sender: chrome.runtime.MessageSender) => void) {
    chrome.runtime.onMessage.addListener((message: AppMessage, sender: chrome.runtime.MessageSender, _sendResponse: (response?: any) => void) => {
      handler(message, sender);
      // This is for internal events, so we might not need sendResponse here
    });
  }
}
