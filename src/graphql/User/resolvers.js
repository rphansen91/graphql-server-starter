const { createToken } = require("../../auth");
const first = require("lodash/first");
const {
  idResolver,
  updateResolver,
  filterResolver,
  paginateResolver
} = require("../../db/helpers");

module.exports = {
  Query: {
    me: (root, args, { user }) => user,
    user: (root, args, { db }) => {
      return db.users.findOne(idResolver(args), {
        projection: { password: 0 }
      });
    },
    users: (root, args, { db }) => {
      const query = filterResolver(db.users, args);
      const pages = paginateResolver(query, args);
      return pages.project({ password: 0 }).toArray();
    }
  },
  Mutation: {
    login: (root, { email, password }, { db }) => {
      return Promise.all([
        db.users.findOne({ email: email.toLowerCase(), password }),
        db.users.findOne({ username: email, password })
      ])
        .then(([e, u]) => e || u)
        .then(v => {
          if (!v) throw new Error("User not found");
          return v;
        })
        .then(createToken)
        .then(token => ({ token }));
    },
    addUser: (root, args, { db }) => {
      const email = args.email.toLowerCase();
      return db.users
        .insertOne(Object.assign({}, args, { email }))
        .then(({ ops }) => first(ops));
    },
    updateUser: (root, args, { db, user }) => {
      if (!user) return null;
      return db.users
        .findOneAndUpdate(idResolver({ id: user._id }), updateResolver(args))
        .then(({ value }) => value);
    },
    rmUser: (root, args, { db, user }) => {
      if (!user) return false;
      return db.users
        .findOneAndDelete(idResolver({ id: user._id }))
        .then(({ value }) => !!value);
    }
  },
  User: {
    _id: ({ _id = "" }) => _id.toString(),
    fullName: ({ firstName, lastName }) =>
      [firstName, lastName].filter(v => v).join(" "),
    image: ({ image }) => image || "//placehold.it/180x100"
  }
};
