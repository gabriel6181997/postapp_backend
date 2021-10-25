import { Users } from "@src/models/Users";
import bcrypt from "bcryptjs";
import { Request } from "express";
import { sign } from "jsonwebtoken";

class UsersController {
  async createUser(req: Request, res: Response) {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username,
        password: hash,
      });
      res.json(
        // "SUCCESS"
      );
    });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      res.json(
        // { error: "User Doesn't exist" }
      );
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json(
          // { error: "Wrong Username and Password Combination" }
        );
      }

      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json(
        // { token: accessToken, username: username, id: user.id }
      );
    });
  }

  async getUser(req: Request, res: Response) {
    res.json(
      // req.user
    );
  }

  async getBasicInfo(req: Request, res: Response) {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    res.json(
      // basicInfo
    );
  }

  async changePassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({
      where: {
        username: req.user.username,
      },
    });

    bcrypt.compare(oldPassword, user.password).then((match) => {
      if (!match) res.json(
        // { error: "Wrong Password Entered!" }
      );

      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          {
            password: hash,
          },
          { where: { username: req.user.username } }
        );
        res.json(
          // "SUCCESS"
        );
      });
    });
  }
}

export default new UsersController();
