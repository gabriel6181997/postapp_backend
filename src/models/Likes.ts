import db from "@src/models";
import { DataTypes, Model } from "sequelize";

interface LikesAttributes {
  id: number;
}

export class Likes extends Model<LikesAttributes> implements LikesAttributes {
  id!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  static associate(models: any) {
    Likes.belongsTo(models.Posts, {
      foreignKey: "PostId",
      onDelete: "cascade",
      as: "post",
    });

    Likes.belongsTo(models.Users, {
      foreignKey: "UserId",
      onDelete: "cascade",
      as: "user",
    });
  }
}
Likes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
  },
  { sequelize: db, modelName: "Likes" }
);
