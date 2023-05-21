const express = require("express");
const app = express();
const userRouter = express.Router();
const protectRoute = require("./authHelper");
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/userController");

// user options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

// profile page
app.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

// admin specific func
app.use(isAuthorized(["admin"]));

userRouter.route("").get(getAllUser);

module.exports = userRouter;
