import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { Users } from "./Users";

interface PostsAttributes {
  id: number;
  title: string;
  postText: string;
  username: string;
}

interface PostsCreationAttributes extends Optional<PostsAttributes, "id"> {}

interface PostsInstance
  extends Model<PostsAttributes, PostsCreationAttributes> {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Posts = sequelize.define<PostsInstance>("Posts", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Posts.hasMany(Comments, {
  onDelete: "cascade",
});

Posts.hasMany(Likes, {
  onDelete: "cascade",
});

Posts.belongsTo(Users, {
  foreignKey: "UserId",
  onDelete: "cascade",
  as: "user"
})
