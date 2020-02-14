import { ErrorRequestHandler } from "express";
import { Logger } from '../core/Logger';

export class GenericError extends Error {
  errorCode?: string;
  status?: number;
  log?: string;

  constructor(message: string, err?: ErrorStub) {
    super();
    this.log = err?.log;
    this.status = err?.status;
    this.errorCode = err?.errorCode;
  }
}

interface ErrorStub {
  errorCode?: string;
  status?: number;
  log?: string;
}

export const errorHandling: ErrorRequestHandler = (err: GenericError, req, res, next) => {
  const statusCode = err.status || 500;
  const errorCode = err.errorCode || 'GENERIC_ERROR';
  Logger.error(err.log)
  res.status(statusCode).json({
    status: false,
    errorCode: errorCode,
    message: err.message
  })
}


