import express from "express";
import cors from "cors";
// import * as dotenv from "dotenv";

const app = express();
// dotenv.config();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

import db from "./models";

// Routers
import { postRouter } from "./routes/Posts";
app.use("/posts", postRouter);
import { commentRouter } from "./routes/Comments";
app.use("/comments", commentRouter);
import { userRouter } from "./routes/Users";
app.use("/auth", userRouter);
import { likeRouter } from "./routes/Likes";
app.use("/likes", likeRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.log(error);
  });
