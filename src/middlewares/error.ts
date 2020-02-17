import { ErrorRequestHandler } from "express";
import { Logger } from "../core/Logger";

export class GenericError extends Error {
  errorCode?: string;
  status?: number;
  log?: string;

  constructor(message: string, err: ErrorStub = {}) {
    super(message);
    this.log = err.log;
    this.status = err.status;
    this.errorCode = err.errorCode;
  }
}

interface ErrorStub {
  errorCode?: string;
  status?: number;
  log?: string;
}

export const errorHandling: ErrorRequestHandler = (
  err: GenericError | Error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let errorCode = "ERROR";
  let log = err.message;

  if (err instanceof GenericError) {
    statusCode = err.status || 500;
    errorCode = err.errorCode || "ERROR";
    log = err.log || err.message;
  }

  Logger.error(log);

  res.status(statusCode).json({
    status: false,
    errorCode: errorCode,
    message: err.message
  });
};
