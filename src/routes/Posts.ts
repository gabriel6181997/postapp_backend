import { Router } from "express";
import { validateToken } from "../middleware/AuthMiddleware";
import { Posts } from "../models/Posts";
import { Likes } from "../models/Likes";

export const postRouter = Router();

postRouter.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts, likedPosts });
});

postRouter.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

postRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: {
      UserId: id,
    },
    include: [Likes],
  });
  res.json(listOfPosts);
});

postRouter.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

postRouter.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id } });
  res.json(newTitle);
});

postRouter.put("/postText", validateToken, async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id } });
  res.json(newText);
});

postRouter.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });
  res.json("Deleted successfully!");
});
