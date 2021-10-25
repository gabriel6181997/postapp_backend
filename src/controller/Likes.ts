import { Likes } from "@src/models/Likes";
import { Request, Response } from "express";

class LikesController {
  async LikesAction(req: Request, res: Response) {
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
  }
}

export default new LikesController();
