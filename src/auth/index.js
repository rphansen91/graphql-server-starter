const fs = require("fs");
const jwt = require("jsonwebtoken");
const key = loadSecret();

function loadSecret() {
  const secret = "secret";
  try {
    return fs.readFileSync(__dirname + "/private.key", "utf8") || secret;
  } catch (e) {
    return secret;
  }
}

function createToken(data) {
  return jwt.sign(data, key);
}

function verifyToken(data) {
  try {
    return jwt.verify(data, key);
  } catch (err) {
    return {};
  }
}

module.exports = {
  createToken,
  verifyToken
};
