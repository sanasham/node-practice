import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, termCondition } =
      req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "email already exists" });
    } else if (
      name &&
      email &&
      password &&
      password_confirmation &&
      termCondition
    ) {
      if (password === password_confirmation) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new userModel({
          name: name,
          email: email,
          password: hashPassword,
          termCondition: termCondition,
        });
        await doc.save();
      } else {
        res.send({
          status: "failed",
          message: "password and confirm password does not match",
        });
      }
    } else {
      res.send({ status: "failed", message: "all fields are required" });
    }
  };
}

export default UserController;
