const connect = require("../db/connect")();
const { verifyToken } = require("../auth");
const { idResolver } = require("../db/helpers");

module.exports = root => {
  const token = root.req.headers["x-auth-token"];
  const { _id: id } = verifyToken(token);

  return connect().then(db => {
    if (!id) return { db };
    return db.users.findOne(idResolver({ id })).then(user => ({ user, db }));
  });
};
