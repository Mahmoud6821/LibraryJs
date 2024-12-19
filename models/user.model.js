import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../DB/database.js";

const User = sequelizeInstance.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["Member", "Admin", "Librarian"],
      defaultValue: "Member",
    },
    membership_date: {
      type: DataTypes.DATE,
    },
    user_status: {
      type: DataTypes.ENUM,
      values: ["Active", "Suspended"],
      defaultValue: "Active",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
