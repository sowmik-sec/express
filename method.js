const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// middleware function -> post, front -> json
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
// base route, router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log("server is listening at port, ", 5000);
});
