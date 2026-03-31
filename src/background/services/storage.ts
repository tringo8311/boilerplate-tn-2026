import { z } from 'zod';

export class StorageService {
  constructor() {}

  public async get<T>(key: string, schema: z.ZodType<T>): Promise<T | null> {
    const data = await chrome.storage.local.get(key);
    const value = data[key];

    if (value === undefined) {
      return null;
    }

    const result = schema.safeParse(value);
    if (!result.success) {
      console.error(`Storage validation failed for key: ${key}`, result.error);
      throw new Error(`VALIDATION_ERROR: ${result.error.message}`);
    }

    return result.data;
  }

  public async set<T>(key: string, value: T, schema: z.ZodType<T>): Promise<void> {
    const result = schema.safeParse(value);
    if (!result.success) {
      console.error(`Storage validation failed for key: ${key}`, result.error);
      throw new Error(`VALIDATION_ERROR: ${result.error.message}`);
    }

    await chrome.storage.local.set({ [key]: value });
  }

  public async remove(key: string): Promise<void> {
    await chrome.storage.local.remove(key);
  }

  public async clear(): Promise<void> {
    await chrome.storage.local.clear();
  }
}

export const storage = new StorageService();
