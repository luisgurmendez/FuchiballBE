import { Router } from 'express';
import { checkToken } from "../auth";
import { ErrorResponse } from "./types";
import { UserService } from '../services/user';
import { checkPerms, Permission } from '../core/permissions';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: true });
});

router.get('/all', async (req, res, next) => {
  const users = await new UserService().all();
  res.json({
    status: true,
    data: { users },
  });
});

router.get('/:userId', checkToken, async (req, res, next) => {
  const user = await new UserService().one(req.body.userId)
  if (user) {
    res.json({
      status: true,
      data: {
        user
      }
    })
  }
})

router.post('/delete', checkToken, checkPerms(Permission.superadmin), async (req, res, next) => {
  const user = await new UserService().delete(req.body.userId)
  if (user) {
    res.json({
      status: true,
      data: {
        user
      }
    })
  }
})

export default router;