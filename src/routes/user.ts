import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { UserService } from "../services/UserSerivce";
import { checkPerms, Permission } from "../core/permissions";
import { userNotFoundResponse } from "../responses/user";

const router = Router();

router.get("/status", (req, res) => {
  res.json({ status: true });
});

router.get("/all", async (req, res, next) => {
  const users = await new UserService().all();
  res.json({
    status: true,
    data: { users }
  });
});

router.get("/", checkAuth, async (req, res, next) => {
  const { userId } = res.locals;
  try {
    const user = await new UserService().one(userId);
    res.json({
      status: true,
      data: {
        user
      }
    });
  } catch (e) {
    res.status(404).json(userNotFoundResponse);
  }
});

router.post(
  "/delete",
  checkAuth,
  checkPerms(Permission.superadmin),
  async (req, res, next) => {
    const user = await new UserService().delete(req.body.userId);
    if (user) {
      res.json({
        status: true,
        data: {
          user
        }
      });
    }
  }
);

export default router;
