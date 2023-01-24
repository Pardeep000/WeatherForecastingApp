const mongoose = require("mongoose");

const DB =
  "mongodb+srv://pardeep:uavJVrKeNYUGcuSX@cluster0.upwezke.mongodb.net/WeatherAppDB?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false
    });
    console.log("connected mongoose...");
  } catch (e) {
    console.log("Error in mongoose...", e);
  }
};

module.exports = connectMongo;
