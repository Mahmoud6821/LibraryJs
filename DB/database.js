import mysql from "mysql2";
import { Sequelize } from "sequelize";

export const sequelizeInstance = new Sequelize("library", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export const dbConnection = async () => {
  try {
    await sequelizeInstance.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}; 

 