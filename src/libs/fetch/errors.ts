type ErrorOptions = {
  status?: number;
  cause?: unknown;
};

export class ServerError extends Error {
  override readonly name = 'ServerError';
  status?: number | undefined;
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, { cause: options.cause });
    this.status = options.status;
  }
}

export class NetworkError extends Error {
  override readonly name = 'NetworkError';
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, { cause: options.cause });
  }
}
