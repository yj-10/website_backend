const mongoose = require("mongoose");
const LoginModel = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const Login = mongoose.model("login", LoginModel);
module.exports = Login;
