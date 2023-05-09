const express = require("express");
const app = express();

// middleware function -> post, front -> json
app.use(express.json());

let users = {};
app.get("/user", (req, res) => {
  res.send(users);
});

app.post("/user", (req, res) => {
  console.log(req.body);
  users = req.body;
  res.json({ message: "Data received successfully", user: req.body });
});

// update => patch
app.patch("/user", (req, res) => {
  console.log("req.body => ", req.body);
  // update data in users object
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.send({ message: "data updated successfully" });
});

app.listen(5000);
