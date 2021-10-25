import { UsersAttributes } from "@src/models/Users";

declare global {
  namespace Express {
    interface Request {
      user: UsersAttributes;
      accessToken: string;
    }
  }
}
