import { router } from './router';
import type { AppMessage } from '../shared/messages';
import { migrationService, contextMenuBuilder, LoggerService } from './services';

// Import handlers
import './handlers/authHandler';

chrome.runtime.onInstalled.addListener(async (details: chrome.runtime.InstalledDetails) => {
  LoggerService.info('Extension installed/updated', details.reason);
  await migrationService.checkAndMigrate();

  // Build context menu
  await contextMenuBuilder
    .addItem({ id: 'search', title: 'Search in extension', contexts: ['selection' as chrome.contextMenus.ContextType] })
    .addItem({ id: 'options', title: 'Open Options', contexts: ['action' as chrome.contextMenus.ContextType] })
    .build();
});

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  LoggerService.info('Context menu clicked:', info, tab);
  if (info.menuItemId === 'options') {
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onMessage.addListener((message: AppMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  // Use IIFE to handle async
  (async () => {
    const response = await router.handleMessage(message, sender);
    sendResponse(response);
  })();
  return true; // keep channel open for async response
});

LoggerService.info('Background service worker initialized');
