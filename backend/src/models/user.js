const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cityArray: { type: Array, required: true },
  cityNames: { type: Array, required: true },
  unit: { type: "String", default: "metric" }
});

const User = mongoose.model("weatherUser", userSchema);
// User.createIndexes();

module.exports = User;
