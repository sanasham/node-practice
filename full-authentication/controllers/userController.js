import userModel from "../models/user.js";
import bcrypt, { compare } from "bcrypt";

import jwt from "jsonwebtoken";
import { mongoose } from "mongoose";

class UserController {
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

        const savedUser = await userModel.findOne({ email: email });

        //generate Jwt token

        const token = await jwt.sign(
          { userID: savedUser._id },
          process.env.JWT_SECRETE_KEY,
          { expiresIn: "5d" }
        );

        res.status(201).send({
          status: "success",
          message: "Registration successfull",
          token: token,
        });
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

  static UserLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const pwd = await userModel.findOne({ email: email });
      if (pwd !== null) {
        let isMatch = await bcrypt.compare(password, pwd.password);

        if (pwd.email === email && isMatch) {
          //generate Jwt token

          const token = await jwt.sign(
            { userID: pwd._id },
            process.env.JWT_SECRETE_KEY,
            { expiresIn: "5d" }
          );
          res.send({ message: "Login successfull", token: token });
        } else {
          res.send({ message: "you are not a registered user " });
        }
      } else {
        res.send({ message: "you are not a registered user " });
      }
    } else {
      res.send({ message: "Please enter a username and password" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, pa } = req.body;
  };
}

export default UserController;
