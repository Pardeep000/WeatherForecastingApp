const express = require("express");
const app = express();
const axios = require("axios");
//
const User = require("./models/user");
//
const http = require("http");
const httpServer = http.createServer(app);
//
const cors = require("cors");
app.use(cors());
//
const { Server } = require("socket.io");
const io = new Server(httpServer, { cors: { origin: "*" } });
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

let cityData = "";

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("joinRoom", async (payload) => {
    socket.join(payload);
    console.log("Client joined: ", payload);
    setInterval(async () => {
      let data = await User.findOne({ email: payload });
      cityData = data.cityNames;
      // socket.emit(payload, cityData);
      ////////////////
      //generating default data of the cities from list
      let dataArray = [];
      for (let i = 0; i < cityData.length; i++) {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityData[i]}&units=metric&APPID=9c84a34e765b64034fbddb9e03fe7518`
        );
        let result = await response.data;
        dataArray.push(result);
      }
      console.log("dataArray=>", dataArray);
      ////////////////////
      if (cityData !== "" && dataArray.length !== 0) {
        console.log("payload", dataArray.length);
        socket.emit(payload, dataArray);
      }
    }, 10000);
    //
  });
  //
  socket.on("disconnect", () => {
    console.log("disconnected....");
    cityData = "";
  });
  //
});

httpServer.listen(8080, (e) => {
  if (e) console.log("error occurred in server");
  console.log("server is listening on port 8080");
});

// app.listen(8080, (e) => {
//   if (e) console.log("error occurred in server");
//   console.log("server is listening on port 8080");
// });
