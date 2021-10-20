import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { Posts } from "./Posts";

interface CommentsAttributes {
  id: number;
  commentBody: string;
  username: string;
}

interface CommentsCreationAttributes
  extends Optional<CommentsAttributes, "id"> {}

interface CommentsInstance
  extends Model<CommentsAttributes, CommentsCreationAttributes> {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Comments = sequelize.define<CommentsInstance>("Comments", {
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
});

Comments.belongsTo(Posts, {
  foreignKey: "PostId",
  onDelete: "cascade",
  as: "post",
})
