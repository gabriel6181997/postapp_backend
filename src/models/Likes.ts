import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { Posts } from "./Posts";
import { Users } from "./Users";

interface LikesAttributes {
  id: number;
}

interface LikesCreationAttributes extends Optional<LikesAttributes, "id"> {}

interface LikesInstance
  extends Model<LikesAttributes, LikesCreationAttributes> {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Likes = sequelize.define<LikesInstance>("Likes", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
});

Likes.belongsTo(Posts, {
  foreignKey: "PostId",
  onDelete: "cascade",
  as: "post",
})

Likes.belongsTo(Users, {
  foreignKey: "UserId",
  onDelete: "cascade",
  as: "user",
})



