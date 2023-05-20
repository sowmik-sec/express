const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  const id = req.params.id;
  const user = await userModel.findById(id);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};

// module.exports.postUser = async function postUser(req, res) {
//   console.log(req.body);
//   user = req.body;
//   res.json({ message: "Data received successfully", user: req.body });
// };
module.exports.updateUser = async function updateUser(req, res) {
  try {
    let dataToBeUpdated = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      res.send({ message: "data updated successfully", data: user });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "User not found",
      });
    }
    res.json({
      message: "data has been deleted",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  const users = await userModel.find();
  if (users) {
    res.json({
      message: "Users retrieved",
      data: users,
    });
  } else {
    res.json({
      message: "No user found",
    });
  }
};
// Cookies
// const getCookies = (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.send("cookies received");
// };
// const setCookies = (req, res) => {
//   // res.setHeader("Set-Cookie", "isLoggedIn=true");
//   res.cookie("isLoggedIn", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     secure: true,
//     httpOnly: true,
//   });
//   res.send("cookies has been set");
// };
