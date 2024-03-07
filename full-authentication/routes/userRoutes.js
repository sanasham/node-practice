import express from "express";
import UserController from "../controllers/userController.js";
const userRouter = express.Router();

//Public routes

userRouter.post("/register", UserController.userRegistration);

//Private routes

//protected routes

export default userRouter;
