import * as jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../config';
import { Permission } from './permissions';
import { UserService } from '../services/UserSerivce';

export interface JWTDecodedPayload {
  userId: string;
  permissions: Permission;
  username: string;
}

export interface Tokens {
  token: string;
  refreshToken: string;
};

export class Auth {

  static async handleAuth(username: string, password: string): Promise<Tokens | undefined> {

    const userService = new UserService();
    const loginSuccess = await userService.login(username, password);
    if (loginSuccess) {
      const user = await userService.findByUsername(username);
      const decoded: JWTDecodedPayload = {
        userId: user.id,
        username: user.username,
        permissions: user.permissions
      }
      const tokens = Auth.getTokens(decoded)
      return tokens
    }
    return undefined
  }

  static handleRefreshToken = async (token: string, refreshToken: string): Promise<Tokens | undefined> => {

    try {
      jwt.verify(token, jwtSecretKey);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        const payload = jwt.decode(token);
        if (Auth.isJWTDecodedPayload(payload)) {
          const isRefreshTokenValid = await Auth.validateRefreshToken(refreshToken, payload.username);
          if (isRefreshTokenValid) {
            return Auth.getTokens(payload);
          }
        }
      }
    }
    return undefined;
  }

  private static async validateRefreshToken(refreshToken: string, username: string): Promise<boolean> {
    return refreshToken === username
  }

  private static isJWTDecodedPayload(payload: object | string): payload is JWTDecodedPayload {
    return typeof payload === 'object' &&
      (payload as any).userId !== undefined &&
      (payload as any).permissions !== undefined &&
      (payload as any).username !== undefined
  }

  private static getTokens(decoded: JWTDecodedPayload): Tokens {

    let token = jwt.sign({ userId: decoded.userId, username: decoded.username, permissions: decoded.permissions },
      jwtSecretKey,
      {
        expiresIn: '24h'
      }
    );

    return { token, refreshToken: decoded.username }
  }


}
