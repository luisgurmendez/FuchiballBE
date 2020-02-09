import { Router } from 'express';
import { checkToken } from "../auth";
import { UserService } from '../services/UserSerivce';
import { checkPerms, Permission } from '../core/permissions';

const router = Router();

router.get('/status', (req, res) => {
  res.json({ status: true });
});

router.get('/all', checkPerms(Permission.superadmin), async (req, res, next) => {
  const users = await new UserService().all();
  res.json({
    status: true,
    data: { users },
  });
});

router.get('/', checkToken, async (req, res, next) => {
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

router.post('/delete', checkToken, checkPerms(Permission.division), async (req, res, next) => {
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