const connect = require("../db/connect")();

module.exports = () => {
  return Promise.all([connect()]).then(([db]) => ({
    db
  }));
};
