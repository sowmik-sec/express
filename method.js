const express = require("express");
const app = express();

// middleware function -> post, front -> json
app.use(express.json());

let user = {};
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

app.listen(5000);
