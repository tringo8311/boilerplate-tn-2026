export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class LoggerService {
  private static logLevel: LogLevel = import.meta.env.DEV ? LogLevel.DEBUG : LogLevel.INFO;

  public static setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }

  public static debug(message: string, ...args: any[]) {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  public static info(message: string, ...args: any[]) {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  public static warn(message: string, ...args: any[]) {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  public static error(message: string, ...args: any[]) {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
}
