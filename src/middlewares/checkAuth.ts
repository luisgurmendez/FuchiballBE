import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { jwtSecretKey } from "../config";
import { JWTDecodedPayload } from "../core/Auth";
import { invalidTokenResponse, noTokenResponse } from "../utils/AuthUtil/responses";
import { isJWTDecodedPayload } from '../utils/AuthUtil/utils';
import { header, oneOf, validationResult } from "express-validator"

const authValidation = () => {
  return oneOf(
    [
      header('authorization').isJWT(),
      header('x-access-token').isJWT(),
    ]
  )
}

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  } else {
    return res.status(404).json(noTokenResponse);
  }
}

const parseTokenHeaders = (req: Request, res: Response, next: NextFunction) => {

  let token: string = req.headers['x-access-token'] as string || req.headers['authorization'] as string;
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  req.body.token = token;
  return next();
}

const checkAuthCore = (req: Request, res: Response, next: NextFunction) => {

  const token = req.body.token;

  try {
    const payload = jwt.verify(token, jwtSecretKey);
    if (isJWTDecodedPayload(payload)) {
      res.locals = { ...res.locals, ...payload }
      next();
    }
  } catch (err) {
    return res.status(403).json(invalidTokenResponse);
  }
};

/**
 * A list of util middlewares that check weather an authentication is valid.
 * Also adds the token payload to the request locals object.
 */
export const checkAuth = [authValidation(), validateAuth, parseTokenHeaders, checkAuthCore];