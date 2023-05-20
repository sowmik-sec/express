const userModel = require("../models/userModel");

module.exports.getUsers = async function getUsers(req, res) {
  const allUsers = await userModel.find();
  res.json({ message: "list of all users", data: allUsers });
};

module.exports.postUser = async function postUser(req, res) {
  console.log(req.body);
  user = req.body;
  res.json({ message: "Data received successfully", user: req.body });
};
module.exports.updateUser = async function updateUser(req, res) {
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
