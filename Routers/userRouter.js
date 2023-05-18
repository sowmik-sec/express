const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  const allUsers = await userModel.find();
  res.json({ message: "list of all users", data: allUsers });
};

const postUser = (req, res) => {
  console.log(req.body);
  user = req.body;
  res.json({ message: "Data received successfully", user: req.body });
};
const updateUser = async (req, res) => {
  console.log("req.body => ", req.body);
  // update data in user object
  let dataToBeUpdated = req.body;
  const user = await userModel.findOneAndUpdate(
    { email: "ahsan@gmail.com" },
    dataToBeUpdated
  );
  // for (key in dataToBeUpdated) {
  //   user[key] = dataToBeUpdated[key];
  // }
  res.send({ message: "data updated successfully", data: user });
};
const deleteUser = async (req, res) => {
  // user = {};
  const dataToBeDeleted = req.body;
  const user = await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "data has been deleted",
    data: user,
  });
};

const getUserById = (req, res) => {
  console.log(req.params.id);
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < user.length; i++) {
    if (user[i]["id"] == paramId) {
      obj = user[i];
    }
  }
  res.json({
    message: "req received",
    data: obj,
  });
};
// Cookies
const getCookies = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.send("cookies received");
};
const setCookies = (req, res) => {
  // res.setHeader("Set-Cookie", "isLoggedIn=true");
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.send("cookies has been set");
};

let flag = false; // user logged in or not
const protectRoute = (req, res, next) => {
  if (flag) {
    next();
  } else {
    return res.status(401).json({
      message: "Operation not allowed",
    });
  }
};

userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);
userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserById);

module.exports = userRouter;
