import { Comments } from "../models/Comments";
import { Request, Response } from "express";

class CommentsController {
  async readAllComments(req: Request, res: Response) {
    const postId = req.params.postId;
    const comments = await Comments.findAll({
      where: { PostId: postId },
    });
    res.json(comments);
  }

  async createComment(req: Request, res: Response) {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
  }

  async deleteComment(req: Request, res: Response) {
    const commentId = req.params.commentId;
    await Comments.destroy({ where: { id: commentId } });
    res.json("Deleted successfully!");
  }
}

export default new CommentsController();
