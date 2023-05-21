const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

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
