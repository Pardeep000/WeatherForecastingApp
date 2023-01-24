const express = require("express");
const router = express.Router();
//
const axios = require("axios");
const userauth = require("../middleware/userauth");
//
const User = require("../models/user");
const citySelector = require("../models/cityCollection");
//

//userauth,
router.delete("/deleteData", userauth, async (req, res) => {
  // console.log("id=>", req.data.id);
  const { name } = req.body;
  console.log("req_name: ", name);
  try {
    let data = await User.findById(req.data.id);
    let cityArray = data.cityNames;
    console.log("cityARRAY", cityArray);
    //deleting specific city name in list of cities
    let index = cityArray.findIndex((e) => {
      return e === name;
    });
    if (index === -1) {
      return res.status(400).json({ msg: "city name does not exist..." });
    }
    cityArray.splice(index, 1);
    //
    console.log("array: ", cityArray);
    console.log("array_index: ", index);
    //
    //generating default data of the cities from list
    let dataArray = [];
    for (let i = 0; i < cityArray.length; i++) {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityArray[i]}&units=metric&APPID=9c84a34e765b64034fbddb9e03fe7518`
      );
      let result = await response.data;
      dataArray.push(result);
    }
    console.log("dataArray=>", dataArray.length);
    // res.send(dataArray);
    ////////////////////
    //
    let newNote = {
      cityNames: cityArray,
      cityArray: dataArray.reverse()
    };
    //
    await User.findByIdAndUpdate(req.data.id, {
      $set: newNote
    })
      .then((resp) => {
        res.status(200).json({
          msg: "city data has been deleted",
          result: dataArray
        });
      })
      .catch((e) => console.log("error in deleting city data", e));
    //
    // res.send("deleting...");
  } catch (e) {
    res.status(400).json({ msg: "error occurred", error: e });
  }
});

//userauth,
router.get("/readCityNames", async (req, res) => {
  // console.log("id=>", req.data.id);
  try {
    let citiesdata = await citySelector.find();
    // console.log("citiesdata", citiesdata);
    // res.send("reding city names");
    res.send(citiesdata[0].cities);
  } catch (e) {
    res.status(400).json({ msg: "error occurred", error: e });
  }
});

router.post("/addData", userauth, async (req, res) => {
  console.log("id=>", req.data.id);
  const { city } = req.body;
  try {
    let data = await User.findById(req.data.id);
    let citynames = data.cityNames;

    let existing = citynames.includes(city);
    if (existing) {
      return res
        .status(400)
        .json({ msg: "City already exists in the list..." });
    }
    //pushing in list names
    citynames.push(city);
    console.log("citynames=>", citynames);
    /////////////////////
    //generating default data of the cities from list
    let dataArray = [];
    for (let i = 0; i < citynames.length; i++) {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${citynames[i]}&units=metric&APPID=9c84a34e765b64034fbddb9e03fe7518`
      );
      let result = await response.data;
      dataArray.push(result);
    }
    console.log("dataArray=>", dataArray.length);
    ////////////////////
    //
    let newNote = {
      cityNames: citynames,
      cityArray: dataArray.reverse()
    };
    //
    await User.findByIdAndUpdate(req.data.id, {
      $set: newNote
    })
      .then((resp) => {
        // console.log("user is updated", resp);
        res.status(200).json({
          msg: "user data has been updated",
          // result: resp.cityArray.length
          result: dataArray
        });
      })
      .catch((e) => console.log("error in updating user", e));
    //
    // console.log("weatherCityData", weatherCityData);
    // res.status(200).json({ msg: "user data has been updated", result: weatherCityData });
  } catch (e) {
    res.status(400).json({ msg: "error occurred", error: e });
  }
});

//userauth,
router.post("/readData", userauth, async (req, res) => {
  // console.log("id=>", req.data.id);
  try {
    let data = await User.findById(req.data.id);
    res.json({
      msg: "cityArray has been read",
      unit: data.unit,
      result: data.cityArray
    });
  } catch (e) {
    res.status(400).json({ msg: "error occurred", error: e });
  }
});

////////////reading Default data
let cityArray = ["karachi", "lahore", "hyderabad", "rawalpindi", "multan"];
router.get("/readDefaultData", async (req, res) => {
  try {
    let dataArray = [];
    for (let i = 0; i < cityArray.length; i++) {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityArray[i]}&units=metric&APPID=9c84a34e765b64034fbddb9e03fe7518`
      );
      let result = await response.data;
      dataArray.push(result);
    }

    res.json({ msg: "cityArray has been read", result: dataArray });
    //
  } catch (e) {
    res.status(400).json({ msg: "error occurred", error: e });
  }
});

module.exports = router;
