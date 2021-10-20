import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { Likes } from "./Likes";
import { Posts } from "./Posts";

interface UsersAttributes {
  id: number;
  username: string;
  password: string;
}

interface UsersCreationAttributes extends Optional<UsersAttributes, "id"> {}

export interface UsersInstance
  extends Model<UsersAttributes, UsersCreationAttributes> {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Users = sequelize.define<UsersInstance>("Users", {
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
});

Users.hasMany(Likes, {
  onDelete: "cascade",
});

Users.hasMany(Posts, {
  onDelete: "cascade",
});
