
import { Router } from 'express';
import { authSuccessResponse, authFailResponse, badRefreshTokenResponse } from '../utils/AuthUtil/responses';
import { Auth } from '../Auth';
const router = Router();

//todo if username && password;
// TOOD: Validate params 
router.post('/login', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const authentication = await Auth.handleAuth(username, password);
  if (authentication) {
    res.json(authSuccessResponse(authentication));
  } else {
    res.status(403).json(authFailResponse('Incorrect username or password'));
  }
});


router.post('/refresh', async (req, res, next) => {
  const token = req.body.token;
  const refreshToken = req.body.refreshToken;

  const authentication = await Auth.handleRefreshToken(token, refreshToken);
  if (authentication) {
    res.json(authSuccessResponse(authentication));
  } else {
    return res.status(400).json(badRefreshTokenResponse);
  }

})


export default router;


