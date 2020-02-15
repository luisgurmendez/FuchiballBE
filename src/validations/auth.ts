import { body } from "express-validator"

export const loginValidation = () => {
  return [
    body('username').exists(),
    body('password').exists(),
  ]
}

export const refreshValidation = () => {
  return [
    body('token').isJWT(),
    body('refreshToken').exists(),
  ]
}