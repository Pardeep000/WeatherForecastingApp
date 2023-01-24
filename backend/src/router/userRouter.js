const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//
const User = require("../models/user");
const axios = require("axios");
//
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//
let cityArray = ["Karachi", "Lahore", "Hyderabad", "Rawalpindi", "Multan"];
//
let newuserArray = [
  body("name", "Length of name should not be less than 3").isLength({ min: 3 }),
  body("email", "Enter your email address").isEmail(),
  body("password", "Password length should be >= 5").isLength({ min: 5 }),
  body("cpassword")
    .exists({ checkFalsy: true })
    .withMessage("You must type a confirmation password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match")
];

router.post("/newuser", newuserArray, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  //
  let check = await User.findOne({ email: req.body.email });
  //
  if (check) {
    return res.status(404).json({ msg: "user already exists" });
  }
  //generating salted and hashed password
  let salt = await bcrypt.genSalt(10);
  let hashPass = await bcrypt.hash(req.body.password, salt);
  try {
    //generating default data of the 5 cities
    let dataArray = [];
    for (let i = 0; i < cityArray.length; i++) {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityArray[i]}&units=metric&APPID=9c84a34e765b64034fbddb9e03fe7518`
      );
      let result = await response.data;
      dataArray.push(result);
    }
    console.log("dataArray=>", dataArray.length);
    ///////////
    let result = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      cityArray: dataArray,
      cityNames: cityArray
    });
    ///////////
    res.status(200).json({ msg: "User is created", result: result });
  } catch (e) {
    res.status(400).json({ msg: "Error ocurred", error: e });
  }
});

let loginuserArray = [
  body("email", "Please login with correct email address").isEmail(),
  body("password").exists()
];
router.post("/loginuser", loginuserArray, async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(400).json({ msg: "user does not exists!!!" });
    }
    let existingPass = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (existingPass) {
      let obj = {
        id: existingUser.id
      };
      let logintoken = jwt.sign(obj, process.env.API_KEY);
      //
      //generating data for the sidebar display
      const { name, email, date } = existingUser;
      let logindate = new Date();
      //
      let ownerObj = {
        name,
        email,
        createAt: date.toUTCString(),
        loginAt: logindate.toUTCString()
      };
      // res.status(200).json({ msg: "password matched", token: logintoken });
      res.status(200).json({
        msg: "password matched",
        ownerObj,
        token: logintoken
      });
    } else {
      res.status(400).json({ msg: "password does not matched!!!" });
    }
  } catch (e) {
    res.status(400).json({ msg: "error occurred", error: e });
  }
});

module.exports = router;
