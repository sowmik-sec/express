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

// DB
// (async function createUser() {
//   const user = {
//     name: "sowmik",
//     email: "sowmik@gmail.com",
//     password: "123456",
//     confirmPassword: "123456",
//   };
//   const data = await userModel.create(user);
//   console.log(data);
// })();
// this line of code immediately invoke the function

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

module.exports = authRouter;
