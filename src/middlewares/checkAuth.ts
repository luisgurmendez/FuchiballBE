import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { jwtSecretKey } from "../config";
import { JWTDecodedPayload } from "Auth";
import { invalidTokenResponse, noTokenResponse } from "../utils/AuthUtil/responses";
import { isJWTDecodedPayload } from '../utils/AuthUtil/utils';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.headers['x-access-token'] as string || req.headers['authorization'] as string;

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    try {
      const payload = jwt.verify(token, jwtSecretKey);
      if (isJWTDecodedPayload(payload)) {
        res.locals.userId = (payload as JWTDecodedPayload).userId;
        res.locals.permissions = (payload as JWTDecodedPayload).permissions;
        next();
      }
    } catch (err) {
      return res.status(403).json(invalidTokenResponse);
    }

  } else {
    return res.status(404).json(noTokenResponse);
  }
};