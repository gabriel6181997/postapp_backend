import { Router } from "express";
import { Users } from "../models/Users";
import bcrypt from "bcryptjs";
import { validateToken } from "../middleware/AuthMiddleware";
import { sign } from "jsonwebtoken";

export const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    res.json({ error: "User Doesn't exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong Username and Password Combination" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

userRouter.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

userRouter.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

userRouter.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({
    where: {
      username: req.user.username,
    },
  });

  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        {
          password: hash,
        },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
});
