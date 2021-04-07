export interface ErrorResponse {
  error: {
    errors: Errors[];
  };
}

export interface Errors {
  code: string;
  message: string;
}
