const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

///database connection

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.fv2y9wr.mongodb.net/sample?retryWrites=true&w=majority"
  )
  .then(() => console.log("database connected successfully"))
  .catch(function (err) {});

//encryption password

// schema for users

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is mandatory"],
    },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory"],
    },
  },
  { timestamps: true }
);

// user model
const userModel = mongoose.model("user", userSchema);

// endpoints to create user

const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
  console.log(req.body);
  const user = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    if (!err) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (!err) {
          user.password = hash;
          userModel
            .create(req.body)
            .then(() => res.send({ message: "user added successfully" }))
            .catch((err) =>
              console.log("error occured while creating user", err)
            );
        }
      });
    }
  });
});

//endpoint to login

app.post("/login", (req, res) => {
  console.log(req.body);
  const userCred = req.body;
  userModel
    .findOne({ email: userCred.email })
    .then((user) => {
      console.log("user", user);
      if (user !== null) {
        bcrypt.compare(userCred.password, user.password, (err, result) => {
          if (result === true) {
            // generate a token and send it back

            jwt.sign({ email: userCred.email }, "sayyed", (err, token) => {
              if (!err) {
                res.send({ token: token });
              } else {
                res.send({
                  message:
                    "some issue happend while creating token please try again",
                });
              }
            });
            // res.send({ message: "login success" });
          } else {
            res.send({ message: "incorrect password" });
          }
        });
      } else {
        res.send({ message: "user does not exist with this email" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "login issue" });
    });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
