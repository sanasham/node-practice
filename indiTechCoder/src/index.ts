import express, { NextFunction, Request, Response } from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import router from "./router/index";
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const URL: string | undefined = process.env.MONGODB_URL;

const app = express();
// app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(URL!)
    .then(() => console.log("database connected successfully"))
    .catch((err) => {
      console.log("database connection error ", err);
    });
}
app.use("/api", router);

app.listen(PORT || 3000, () =>
  console.log(`server is running on port number ${PORT}`)
);

//MONGODB_URL=mongodb+srv://admin:admin@cluster0.fv2y9wr.mongodb.net/sample?retryWrites=true&w=majority
