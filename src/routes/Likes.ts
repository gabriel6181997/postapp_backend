import express from "express";
import { validateToken } from "../middleware/AuthMiddleware";
const router = express.Router();
import { Likes } from "../models";

router.post("/", validateToken, async (req, res) => {
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
    res.json({liked: true});
  } else {
    await Likes.destroy({
      where: {
        PostId,
        UserId,
      },
    });
    res.json({liked: false});
  }
});

module.exports = router;
