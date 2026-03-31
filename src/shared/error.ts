export class AppError extends Error {
  public code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'AppError';
  }

  public toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
