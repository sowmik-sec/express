const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// middleware function -> post, front -> json
app.use(express.json());
app.use(cors());

let user = [
  { id: 1, name: "Ahsan" },
  { id: 2, name: "Habib" },
  { id: 3, name: "Sowmik" },
];

const userRouter = express.Router();
const authRouter = express.Router();
// base route, router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

const getUser = (req, res) => {
  res.send(user);
};

const postUser = (req, res) => {
  console.log(req.body);
  user = req.body;
  res.json({ message: "Data received successfully", user: req.body });
};
const updateUser = (req, res) => {
  console.log("req.body => ", req.body);
  // update data in user object
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    user[key] = dataToBeUpdated[key];
  }
  res.send({ message: "data updated successfully" });
};
const deleteUser = (req, res) => {
  user = {};
  res.json({
    message: "data has been deleted",
  });
};

const getUserById = (req, res) => {
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

const getSignUp = (req, res) => {
  // res.sendFile("public/index.html", { root: __dirname });
  console.log("getSignup called");
};

const postSignUp = (req, res) => {
  let obj = req.body;
  console.log("backend", obj);
  res.json({ message: "user signed up", data: obj });
};

function middleware1(req, res, next) {
  console.log("middleware1 encountered");
  next();
}
function middleware2(req, res, next) {
  console.log("middleware2 encountered");
  // next();
  // res.json({ message: "middleware 2 ended req/res cycle" });
  console.log("middleware 2 ended req/res cycle");
  res.sendFile("public/index.html", { root: __dirname });
}

const db_link =
  "mongodb+srv://sowmiksec:h9oy9z6pCdPriUuU@cluster0.pihjs4z.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then((db) => {
    // console.log(db);
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);
authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

app.listen(5000, () => {
  console.log("server is listening at port, ", 5000);
});
