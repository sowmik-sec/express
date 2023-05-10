const express = require("express");
const app = express();

// middleware function -> post, front -> json
app.use(express.json());

let user = [
  { id: 1, name: "Ahsan" },
  { id: 2, name: "Habib" },
  { id: 3, name: "Sowmik" },
];
app.get("/user", (req, res) => {
  res.send(user);
});

app.post("/user", (req, res) => {
  console.log(req.body);
  user = req.body;
  res.json({ message: "Data received successfully", user: req.body });
});

// update => patch
app.patch("/user", (req, res) => {
  console.log("req.body => ", req.body);
  // update data in user object
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    user[key] = dataToBeUpdated[key];
  }
  res.send({ message: "data updated successfully" });
});

// to delete a data
app.delete("/user", (req, res) => {
  user = {};
  res.json({
    message: "data has been deleted",
  });
});

// params
app.get("/user/:username", (req, res) => {
  console.log(req.params.username);
  console.log(req.params);
  res.send("user received");
});

app.listen(5000);
