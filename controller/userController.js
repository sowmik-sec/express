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
  // user = {};
  const dataToBeDeleted = req.body;
  const user = await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "data has been deleted",
    data: user,
  });
};

module.exports.getUserById = function getUserById(req, res) {
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
