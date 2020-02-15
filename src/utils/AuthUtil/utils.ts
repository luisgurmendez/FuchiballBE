import { JWTDecodedPayload } from '../../Auth';

export function isJWTDecodedPayload(payload: object | string): payload is JWTDecodedPayload {
  return typeof payload === 'object' &&
    (payload as any).userId !== undefined &&
    (payload as any).permissions !== undefined &&
    (payload as any).username !== undefined
}