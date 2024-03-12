import userModel from "../models/user.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

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
          res.send({
            status: "email and password does not match",
            message: "Please enter valid email and password",
          });
        }
      } else {
        res.send({ message: "you are not a registered user " });
      }
    } else {
      res.send({ message: "Please enter a username and password" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword === confirmNewPassword) {
      if (oldPassword === newPassword) {
        res.status(400).send({
          status: "failed",
          message: "Old Password and new password should not be same",
        });
      } else {
        let isMatch = await bcrypt.compare(oldPassword, req.user.password);

        if (isMatch) {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(newPassword, salt);

          await userModel.findByIdAndUpdate(req.user._id, {
            $set: { password: newHashPassword },
          });

          res.status(200).send({ message: "Password changed successfully" });
        } else {
          res.send({
            status: "failed",
            message: "new password and old password mismatch",
          });
        }
      }
    } else {
      res.send({
        status: "failed",
        message: "new password and old passed should be the same",
      });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await userModel.findOne({ email: email });

      if (user) {
        const secret = user._id + process.env.JWT_SECRETE_KEY;
        const token = await jwt.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http:localhost:${3000}/api/user/reset/${
          user._id
        }/${token}`;
        // send email

        const mailOptions = {
          from: process.env.EMAIL_FROM, // sender address
          to: process.env.EMAIL_USER, // list of receivers
          subject: "Hello Narayana this password reset link ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `<a href=${link}>click here</a>  to reset your password`, // html body
        };
        let info = await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });

        console.log("link received", link);
        res.send({
          status: "success",
          message: "Password reset email sent .. please check your email",
          info,
        });
      } else {
        res.send({ status: "failed", message: "email does not exist" });
      }
    } else {
      res.send({ status: "failed", message: "Please enter valid email id" });
    }
  };

  static sendUserPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;

    if (
      password !== "" &&
      password_confirmation !== "" &&
      password === password_confirmation
    ) {
      const user = await userModel.findById(id);
      const secret = user._id + process.env.JWT_SECRETE_KEY;
      try {
        await jwt.verify(token, secret);
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await userModel.findByIdAndUpdate(user._id, {
          $set: { password: newHashPassword },
        });

        res.status(200).send({ message: "Password changed successfully" });
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "Invalied token" });
      }
    } else {
      res.send({
        status: "failed",
        message: "password and confirm password does not match",
      });
    }
  };
}

export default UserController;
