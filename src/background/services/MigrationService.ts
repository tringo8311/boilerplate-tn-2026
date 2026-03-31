export class MigrationService {
  constructor() {}

  public async checkAndMigrate() {
    const currentVersion = chrome.runtime.getManifest().version;
    const data = await chrome.storage.local.get('version');
    const storedVersion = data.version as string | undefined;

    if (!storedVersion) {
      console.log('Fresh installation');
      await this.initializeDefaults();
    } else if (storedVersion !== currentVersion) {
      console.log(`Migrating from ${storedVersion} to ${currentVersion}`);
      await this.runMigrations(storedVersion, currentVersion);
    }

    await chrome.storage.local.set({ version: currentVersion });
  }

  private async initializeDefaults() {
    // Set default settings
    await chrome.storage.local.set({
      settings: {
        theme: 'light',
        notifications: true,
      },
    });
  }

  private async runMigrations(oldVersion: string, newVersion: string) {
    // Migration logic based on versions
    console.log(`Running migrations from ${oldVersion} to ${newVersion}`);
  }
}

export const migrationService = new MigrationService();
