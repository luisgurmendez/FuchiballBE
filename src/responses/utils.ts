export interface ErrorResponse {
  success: false,
  errorCode: string;
  message?: string;
}

export const entityNotFound = (name: string): ErrorResponse => ({
  success: false,
  errorCode: 'NOT_FOUND',
  message: `${name} was not found`
});