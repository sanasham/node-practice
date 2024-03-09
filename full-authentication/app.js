import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";

//middlewares
const app = express();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

//const variables

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

//database connection
connectDB(DATABASE_URL);

// load routes

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
