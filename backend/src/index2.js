const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
//
const connectMongo = require("./db");
//
require("dotenv").config();
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// //
//registration of the userRouter
//
//Connecting mongodb
connectMongo();

app.get("/", (req, res) => {
  res.status(200).send("got connected...");
});

app.use(require("./router/userRouter"));
app.use(require("./router/dataRouter"));
//
app.listen(8080, (e) => {
  if (e) console.log("error occurred in server");
  console.log("server is listening on port 8080");
});
