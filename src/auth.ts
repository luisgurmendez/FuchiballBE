import * as jwt from 'jsonwebtoken';
import { jwtSecretKey } from './config';
import { Request, Response, NextFunction } from 'express';
import { Permission } from 'core/permissions';
import { User } from './db/entity/User';
import { UserService } from './services/UserSerivce';

export const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
  let username = req.body.username;
  let password = req.body.password;

  const userService = new UserService();

  if (username && password) {
    const loginSuccess = await userService.login(username, password);
    if (loginSuccess) {
      const user = await userService.findByUsername(username);
      const tokens = getTokens(user)

      res.json(authSuccessResponse(tokens));
    } else {
      res.status(403).json(authFailResponse('Incorrect username or password'));
    }
  } else {
    res.status(400).json(authFailResponse('Authentication failed! Please check the request'));
  }
}

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.body.token;
  const refreshToken = req.body.refreshToken;

  jwt.verify(token, jwtSecretKey, async (err: jwt.VerifyErrors, payload) => {

    const isRefreshTokenValid = await validateRefreshToken(refreshToken, payload.username);
    if (err instanceof jwt.TokenExpiredError && isRefreshTokenValid) {
      const newTokens = getTokens(payload);
      res.json(authSuccessResponse(newTokens));
    } else {
      return res.status(400).json(badRefreshTokenResponse);
    }
  });
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.headers['x-access-token'] as string || req.headers['authorization'] as string;

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    jwt.verify(token, jwtSecretKey, (err, payload) => {
      if (err) {
        return res.status(403).json(invalidTokenResponse);
      } else {
        res.locals.userId = (payload as JWTDecodedPayload).userId;
        res.locals.permissions = (payload as JWTDecodedPayload).permissions;
        next();
      }
    });
  } else {
    return res.status(404).json(noTokenResponse);
  }
};


function getTokens(user: User): Tokens {

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

interface JWTDecodedPayload {
  userId: string;
  permissions: Permission;
}

interface Tokens {
  token: string;
  refreshToken: string;
};

const authFailResponse = (message: string) => ({
  success: false,
  errorCode: 'AUTH_FAIL',
  message: message
})

const authSuccessResponse = (tokens: Tokens) => ({
  success: true,
  message: 'Authentication successful!',
  token: tokens.token,
  refreshToken: tokens.refreshToken
});

const badRefreshTokenResponse = {
  success: false,
  errorCode: 'BAD_REFRESH_TOKEN_REQUEST',
  message: 'Something went wrong refreshing your tokens'
}

const invalidTokenResponse = {
  success: false,
  errorCode: 'INVALID_TOKEN',
  message: 'Token is not valid'
};

const noTokenResponse = {
  success: false,
  errorCode: 'NO_TOKEN',
  message: 'Auth token is not supplied'
};
