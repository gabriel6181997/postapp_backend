import db from "@src/models";
import { DataTypes, Model } from "sequelize";

interface PostsAttributes {
  id: number;
  title: string;
  postText: string;
  username: string;
}

export class Posts extends Model<PostsAttributes> implements PostsAttributes {
  id!: number;
  title!: string;
  postText!: string;
  username!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  static associate(models: any) {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });
    Posts.belongsTo(models.Users, {
      foreignKey: "UserId",
      onDelete: "cascade",
      as: "user",
    });
  }
}

Posts.init(
  {
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
  },
  {
    sequelize: db,
    modelName: "Posts",
  }
);
