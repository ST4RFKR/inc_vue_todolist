export type ApiResponse<T> = {
  resultCode: number;
  messages: string[];
  data: T;
};

export function unwrapApiResult<T>(res: ApiResponse<T>, fallback: string) {
  if (res.resultCode !== 0) {
    throw new Error(res.messages?.[0] || fallback);
  }
}

export function toError(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error;
  }
  return new Error(fallback);
}
