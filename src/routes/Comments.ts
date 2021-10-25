import CommentsController from "@src/controller/Comment";
import { Router } from "express";
import { validateToken } from "../middleware/AuthMiddleWare";

export const commentRouter = Router();

commentRouter.get("/:postId", CommentsController.readAllComments);

commentRouter.post("/", validateToken, CommentsController.createComment);

commentRouter.delete(
  "/:commentId",
  validateToken,
  CommentsController.deleteComment
);
