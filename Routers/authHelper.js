const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

const protectRoute = (req, res, next) => {
  if (req.cookies.login) {
    const isVerified = jwt.verify(req.cookies.login, JWT_KEY);
    if (isVerified) {
      next();
    } else {
      return res.status(401).json({
        message: "user not verified",
      });
    }
  } else {
    return res.status(401).json({
      message: "Operation not allowed",
    });
  }
};
module.exports = protectRoute;
