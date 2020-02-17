import { Router } from "express";
import {
  authSuccessResponse,
  authFailResponse,
  badRefreshTokenResponse
} from "../responses/auth";
import { Auth } from "../core/Auth";
import { loginValidation, refreshValidation } from "../validations/auth";
import { validate } from "../middlewares/validate";
const router = Router();

router.post("/login", loginValidation(), validate, async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const authentication = await Auth.handleAuth(username, password);
  if (authentication) {
    res.json(authSuccessResponse(authentication));
  } else {
    res.status(403).json(authFailResponse("Incorrect username or password"));
  }
});

router.post(
  "/refresh",
  refreshValidation(),
  validate,
  async (req, res, next) => {
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;

    const authentication = await Auth.handleRefreshToken(token, refreshToken);
    if (authentication) {
      res.json(authSuccessResponse(authentication));
    } else {
      return res.status(400).json(badRefreshTokenResponse);
    }
  }
);

export default router;
