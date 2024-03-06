import express from "express";
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controller/userController";

export default (router: express.Router) => {
  router.get("/users", getAllUsers);
  router.post("/user:/id", updateUser);
  router.delete("/user:/id", deleteUser);
};
