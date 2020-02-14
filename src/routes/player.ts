import { Router } from 'express';
import { checkToken } from "../auth";
import { UserService } from '../services/UserSerivce';
import { checkPerms, Permission } from '../core/permissions';

const router = Router();

router.get('/status', (req, res) => {
  res.json({ status: true });
});

router.get('/all/:userId', checkPerms(Permission.superadmin), async (req, res, next) => {

});

router.get('/all', checkToken, async (req, res, next) => {

});

router.get('/:playerId', checkToken, async (req, res, next) => {
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


export default router;