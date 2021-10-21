import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

import { db } from "./src/models/index";

// Routers
import { postRouter } from "./src/routes/Posts";
app.use("/posts", postRouter);
import { commentRouter } from "./src/routes/Comments";
app.use("/comments", commentRouter);
import { userRouter } from "./src/routes/Users";
app.use("/auth", userRouter);
import { likeRouter } from "./src/routes/Likes";
app.use("/likes", likeRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });
