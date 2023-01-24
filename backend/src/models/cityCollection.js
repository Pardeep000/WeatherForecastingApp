const mongoose = require("mongoose");
const { Schema } = mongoose;

const citySchema = new Schema({
  // cities: {
  //   type: [String],
  //   required: true
  // }
  cities: { type: Array, required: true }
});

const citySelector = mongoose.model("cityCollection", citySchema);
// User.createIndexes();

module.exports = citySelector;
