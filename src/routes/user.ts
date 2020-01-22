import { UserController } from "../controller/UserController";
import { Router } from 'express';
import { checkToken } from "../auth";

const router = Router();

router.use(checkToken);

router.get('/', (req, res) => {
  res.json({ status: true });
});

router.get('/all', async (req, res, next) => {
  const users = await new UserController().all(req, res, next);
  res.json({
    status: true,
    users,
  });
});

export default router;