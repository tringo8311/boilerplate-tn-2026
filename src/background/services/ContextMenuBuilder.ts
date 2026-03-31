export interface ContextMenuItem {
  id: string;
  title: string;
  contexts: chrome.contextMenus.ContextType[];
}

export class ContextMenuBuilder {
  private items: ContextMenuItem[] = [];

  constructor() {}

  public addItem(item: ContextMenuItem): this {
    this.items.push(item);
    return this;
  }

  public async build(): Promise<void> {
    await chrome.contextMenus.removeAll();

    for (const item of this.items) {
      chrome.contextMenus.create({
        id: item.id,
        title: item.title,
        contexts: item.contexts as [chrome.contextMenus.ContextType, ...chrome.contextMenus.ContextType[]],
      });
    }
  }

  public onClicked(handler: (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => void) {
    chrome.contextMenus.onClicked.addListener(handler);
  }
}

export const contextMenuBuilder = new ContextMenuBuilder();
