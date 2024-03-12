import express from "express";
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
const userRouter = express.Router();

//Route level middleware - to protect routes
userRouter.use("/changepassword", checkUserAuth);
userRouter.get("/loggeduser", checkUserAuth);

//Public routes

userRouter.post("/register", UserController.userRegistration);
userRouter.post("/login", UserController.UserLogin);
userRouter.post(
  "/send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);
userRouter.post(
  "/reset-password/:id/:token",
  UserController.sendUserPasswordReset
);

//Private routes

//protected routes
userRouter.post("/changepassword", UserController.changeUserPassword);
userRouter.get("/loggeduser", UserController.loggedUser);

export default userRouter;
