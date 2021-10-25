import { Router } from "express";
import { validateToken } from "@src/middleware/AuthMiddleware";
import LikesController from "@src/controller/Likes";

export const likeRouter = Router();

likeRouter.post("/", validateToken, LikesController.LikesAction);
