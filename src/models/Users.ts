import db from "@src/models";
import { DataTypes, Model } from "sequelize";

export interface UsersAttributes {
  id?: number;
  username: string;
  password: string;
}

export class Users extends Model<UsersAttributes> implements UsersAttributes {
  id!: number;
  username!: string;
  password!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  static associate(models: any) {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
  }
}

Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Users",
  }
);
