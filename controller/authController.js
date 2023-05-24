const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;
// sign up user
module.exports.signup = async function signup(req, res) {
  try {
    const dataObj = req.body;
    const user = await userModel.create(dataObj);
    if (user) {
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      return res.json({
        message: "error while signing up",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

// login user controller
module.exports.login = async function login(req, res) {
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
        const uid = user["_id"];
        const token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token, { httpOnly: true });
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
