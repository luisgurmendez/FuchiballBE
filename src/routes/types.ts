export interface Response<RData = {}> {
  status: boolean;
  data?: RData
}

export interface ErrorResponse extends Response {
  code?: number;
  errorCode: string;
  message: string;
}

// For Ui