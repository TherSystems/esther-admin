export interface ResponseInterface {
  message: string;
  status: string;
  statusCode: number;
}

export interface ErrorResponseInterface {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: ErrorInterface;
}

export interface ErrorInterface {
  message: string;
  error: string;
  statusCode: number;
}

export interface HeadersInterface {
  normalizedNames: NormalizedNamesInterface;
  lazyUpdate: null;
}

export interface NormalizedNamesInterface {}
