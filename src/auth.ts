import * as jwt from 'jsonwebtoken';
import { jwtSecretKey } from './config';
import { Request, Response, NextFunction } from 'express';
import { Permission } from 'core/permissions';
import { getRepository } from 'typeorm';
import { User } from './db/entity/User';

interface JWTDecodedPayload {
  userId: string;
  permissions: Permission;
}

export const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
  let username = req.body.username;
  let password = req.body.password;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ select: ['username', 'password', 'id', 'permissions'], where: { username: username } });

  if (username && password) {
    if (user !== undefined && username === user.username && password === user.password) {

      const tokens = getTokens(user)

      res.json({
        success: true,
        message: 'Authentication successful!',
        token: tokens.token,
        refreshToken: tokens.refreshToken
      });
    } else {
      res.status(403).json({
        success: false,
        errorCode: 'AUTH_FAIL',
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      errorCode: 'AUTH_FAIL',
      message: 'Authentication failed! Please check the request'
    });
  }
}

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.body.token;
  const refreshToken = req.body.refreshToken;

  jwt.verify(token, jwtSecretKey, async (err: jwt.VerifyErrors, payload) => {

    const isRefreshTokenValid = await validateRefreshToken(refreshToken, payload.username);
    if (err instanceof jwt.TokenExpiredError && isRefreshTokenValid) {
      const newTokens = getTokens(payload);
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: newTokens.token,
        refreshToken: newTokens.refreshToken
      });
    } else {
      return res.status(400).json({
        success: false,
        errorCode: 'BAD_REFRESH_TOKEN_REQUEST',
        message: 'Something went wrong refreshing your tokens'
      });
    }
  });
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.headers['x-access-token'] as string || req.headers['authorization'] as string;

  if (token) {

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, jwtSecretKey, (err, payload) => {
      if (err) {
        return res.status(403).json({
          success: false,
          errorCode: 'INVALID_TOKEN',
          message: 'Token is not valid'
        });

      } else {
        res.locals.userId = (payload as JWTDecodedPayload).userId;
        res.locals.permissions = (payload as JWTDecodedPayload).permissions;
        next();
      }
    });
  } else {
    return res.status(404).json({
      success: false,
      errorCode: 'NO_TOKEN',
      message: 'Auth token is not supplied'
    });
  }
};

function getTokens(user: User) {

  let token = jwt.sign({ userId: user.id, username: user.username, permissions: user.permissions },
    jwtSecretKey,
    {
      expiresIn: '24h'
    }
  );

  return { token, refreshToken: user.username }
}

async function validateRefreshToken(refreshToken: string, username: string) {
  return refreshToken === username // LOGIC HERE
}