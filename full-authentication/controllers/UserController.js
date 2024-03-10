import userModel from "../models/user.js";
import bcrypt from "bcrypt";

export class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, termCondition } =
      req.body;

    const user = await userModel.findOne({ email: email });

    console.log(
      "destructued vlaues",
      name,
      email,
      password,
      password_confirmation,
      termCondition
    );
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
        res
          .status(201)
          .send({ status: "success", message: "Registration successfull" });
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

  static UserLogin = (req, res) => {
    const { name, password } = req.body;
    if (name && password) {
    } else {
      res.send({ message: "Please enter a username and password" });
    }
  };
}
