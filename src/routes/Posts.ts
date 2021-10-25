import { Router } from "express";
import { validateToken } from "@src/middleware/AuthMiddleware";
import PostsController from "@src/controller/Posts";

export const postRouter = Router();

postRouter.get("/", validateToken, PostsController.getAllPosts);

postRouter.get("/byId/:id", PostsController.getPost);

postRouter.get("/byuserId/:id", PostsController.getAllPostsByUserId);

postRouter.post("/", validateToken, PostsController.createPost);

postRouter.put("/title", validateToken, PostsController.updateTitle);

postRouter.put("/postText", validateToken, PostsController.updatePostText);

postRouter.delete("/:postId", validateToken, PostsController.deletePost);
