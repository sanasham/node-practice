import express from "express";
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
const userRouter = express.Router();

//Route level middleware - to protect routes
userRouter.use("/changepassword", checkUserAuth);

//Public routes

userRouter.post("/register", UserController.userRegistration);
userRouter.post("/login", UserController.UserLogin);

//Private routes

//protected routes
userRouter.post("/changepassword", UserController.changeUserPassword);

export default userRouter;
