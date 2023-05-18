const express = require("express");
const userModel = require("../models/userModel");

const authRouter = express.Router();

const getSignUp = async (req, res, next) => {
  // res.sendFile("public/index.html", { root: __dirname });
  console.log("getSignup called");
  next();
};

const postSignUp = async (req, res) => {
  const dataObj = req.body;
  const user = await userModel.create(dataObj);
  // console.log("backend", user);
  res.json({ message: "user signed up", data: user });
};

function middleware1(req, res, next) {
  console.log("middleware1 encountered");
  next();
}
function middleware2(req, res, next) {
  console.log("middleware2 encountered");
  // next();
  // res.json({ message: "middleware 2 ended req/res cycle" });
  console.log("middleware 2 ended req/res cycle");
  res.sendFile("public/index.html", { root: __dirname });
}

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    let user;
    if (data.email) {
      user = await userModel.findOne({ email: data.email });
    } else {
      return res.json({
        message: "Please fill email and password",
      });
    }
    if (user) {
      // bcrypt -> compare function
      if (user.password == data.password) {
        return res.json({
          message: "User Logged in",
          userDetails: data,
        });
      } else {
        return res.json({
          message: "Wrong credentials",
        });
      }
    } else {
      return res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

authRouter.route("/login").post(loginUser);

module.exports = authRouter;
