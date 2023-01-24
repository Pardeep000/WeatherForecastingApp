const API_KEY = "123";
const jwt = require("jsonwebtoken");
let getuser = (req, res, next) => {
  let token = req.header("authtoken");
  if (!token) {
    return res.status(401).json({ msg: "Authenticate your token..." });
  }
  try {
    const data = jwt.verify(token, API_KEY);
    req.data = data;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Authenticate your token..." });
  }
};

module.exports = getuser;
