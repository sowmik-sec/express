const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

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
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 6,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
});

// event occurs  before saving in db
// userSchema.pre("save", function () {
//   console.log("before saving in db", this);
// });
// event occurs  after saving in db
// userSchema.post("save", function (doc) {
//   console.log("after saving in db", doc);
// });

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt();
//   const hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString;
// });

// model
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
