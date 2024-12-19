import express from "express";
import {dbConnection} from "./DB/database.js";
import userRouter from "./routes/user.routes.js";
import { config } from "dotenv";
import User from "./models/user.model.js";
import { globaleResponse } from "./middlewares/error-handling.middleware.js";
const app = express();

//json parser
app.use(express.json());

//database connection
dbConnection();

//.env file
config();

//routes for now
app.use("/user",userRouter);
app.use(globaleResponse)

//server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
