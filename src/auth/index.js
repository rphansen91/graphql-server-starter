const fs = require("fs");
const jwt = require("jsonwebtoken");
const key = fs.readFileSync(__dirname + "/private.key", "utf8") || "secret";

const createToken = data => jwt.sign(data, key);
const verifyToken = data => {
  try {
    return jwt.verify(data, key);
  } catch (err) {
    return {};
  }
};

module.exports = {
  createToken,
  verifyToken
};
