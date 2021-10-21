import { Router } from 'express'
import { Comments } from "../models/Comments";
import { validateToken } from "../middleware/AuthMiddleWare";

export const commentRouter = Router();

commentRouter.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: { PostId: postId },
  });
  res.json(comments);
});

commentRouter.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

commentRouter.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } });
  res.json("Deleted successfully!");
});

