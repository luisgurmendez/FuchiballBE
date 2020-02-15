import { Tokens } from "Auth";

export const authFailResponse = (message: string) => ({
  success: false,
  errorCode: 'AUTH_FAIL',
  message: message
})

export const authSuccessResponse = (tokens: Tokens) => ({
  success: true,
  message: 'Authentication successful!',
  token: tokens.token,
  refreshToken: tokens.refreshToken
});

export const badRefreshTokenResponse = {
  success: false,
  errorCode: 'BAD_REFRESH_TOKEN_REQUEST',
  message: 'Something went wrong refreshing your tokens'
}

export const invalidTokenResponse = {
  success: false,
  errorCode: 'INVALID_TOKEN',
  message: 'Token is not valid'
};

export const noTokenResponse = {
  success: false,
  errorCode: 'NO_TOKEN',
  message: 'Auth token is not supplied'
};
