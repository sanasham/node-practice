import { response } from "express";
import userModel from "../models/user.js";
const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization?.startswith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      // token verification
      const { userId } = jwt.verify(token, process.env.JWT_SECRETE_KEY);
      //get user from token
      req.user = await userModel.findById(userId).select(-password);
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
