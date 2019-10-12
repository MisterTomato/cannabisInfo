var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  analytics: [{ date: String, count: Number }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
