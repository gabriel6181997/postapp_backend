import { Posts } from "@src/models/Posts";
import { Request, Response } from "express";
import { Likes } from "@src/models/Likes";

class PostsController {
  async getAllPosts(req: Request, res: Response) {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({
      where: { UserId: req.user.id },
    });
    res.json({ listOfPosts, likedPosts });
  }

  async getPost(req: Request, res: Response) {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({
      where: { UserId: req.user.id },
    });
    res.json({ listOfPosts, likedPosts });
  }

  async getAllPostsByUserId(req: Request, res: Response) {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
      where: {
        UserId: id,
      },
      include: [Likes],
    });
    res.json(listOfPosts);
  }

  async createPost(req: Request, res: Response) {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
  }

  async updateTitle(req: Request, res: Response) {
    const { newTitle, id } = req.body;
    await Posts.update({ title: newTitle }, { where: { id } });
    res.json(newTitle);
  }

  async updatePostText(req: Request, res: Response) {
    const { newText, id } = req.body;
    await Posts.update({ postText: newText }, { where: { id } });
    res.json(newText);
  }

  async deletePost(req: Request, res: Response) {
    const postId = req.params.postId;
    await Posts.destroy({ where: { id: postId } });
    res.json("Deleted successfully!");
  }
}

export default new PostsController();
