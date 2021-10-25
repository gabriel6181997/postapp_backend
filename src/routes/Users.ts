import { Router } from "express";
import { validateToken } from "@src/middleware/AuthMiddleware";
import  UsersController from "@src/controller/Users";

export const userRouter = Router();

userRouter.post("/", UsersController.createUser);

userRouter.post("/login", UsersController.login);

userRouter.get("/auth", validateToken, UsersController.getUser);

userRouter.get("/basicinfo/:id", UsersController.getBasicInfo);

userRouter.put("/changepassword", validateToken, UsersController.changePassword);
