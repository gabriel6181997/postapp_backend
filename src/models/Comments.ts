import db from "./index";
import { DataTypes, Model } from "sequelize";

interface CommentsAttributes {
  id: number;
  commentBody: string;
  username: string;
}

export class Comments extends Model<CommentsAttributes> {
  id!: number;
  commentBody!: string;
  username!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  static associate(models: any) {
    Comments.belongsTo(models.Posts, {
      foreignKey: "PostId",
      onDelete: "cascade",
      as: "post",
    });
  }
}

Comments.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    commentBody: {
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
    modelName: "Comments",
  }
);
