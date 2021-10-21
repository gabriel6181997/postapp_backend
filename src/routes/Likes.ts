import { Router } from "express";
import { validateToken } from "../middleware/AuthMiddleware";
import { Likes } from "../models/Likes";

export const likeRouter = Router();

likeRouter.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: {
      PostId,
      UserId,
    },
  });

  if (!found) {
    await Likes.create({
      PostId,
      UserId,
    });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: {
        PostId,
        UserId,
      },
    });
    res.json({ liked: false });
  }
});
