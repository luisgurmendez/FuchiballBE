import { Router } from "express";
import { UserService } from "../services/UserSerivce";
import { checkPerms, Permission } from "../core/permissions";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.get("/status", (req, res) => {
  res.json({ status: true });
});

router.get("/", checkAuth, async (req, res, next) => {
  const { userId } = res.locals;
  const players = await new UserService().getAllPlayersOfUser(userId);
  res.json({
    status: true,
    data: {
      players: players || []
    }
  });
});

router.get("/:playerId", checkAuth, async (req, res, next) => {
  const user = await new UserService().one(req.body.userId);
  if (user) {
    res.json({
      status: true,
      data: {
        user
      }
    });
  }
});

export default router;
