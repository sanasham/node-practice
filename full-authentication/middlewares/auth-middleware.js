import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization?.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      // token verification
      const { userID } = jwt.verify(token, process.env.JWT_SECRETE_KEY);
      console.log("userId: " + userID);
      //get user from token
      const pathname = req.path;
      console.log(pathname);
      req.user =
        pathname === "/loggeduser"
          ? await userModel.findById(userID).select("-password")
          : await userModel.findById(userID);
      // req.user = await userModel.findById(userID).select("-password");
      //req.user = await userModel.findById(userID);
      console.log("req.user = " + req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "Faild", message: "Unauthorized User" });
    }
  } else {
    res.status(401).send({
      status: "Faild",
      message: "Unauthorized User as please provide valied token",
    });
  }
};

export default checkUserAuth;
