import { UsersInstance } from "@src/models/Users";

declare global {
  namespace Express {
    interface Request {
      user: UsersInstance;
      accessToken: string;
    }
  }
}
