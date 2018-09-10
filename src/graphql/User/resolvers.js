const {
  idResolver,
  updateResolver,
  filterResolver,
  paginateResolver
} = require("../../db/helpers");

module.exports = {
  Query: {
    user: (root, args, { db }) => {
      return db.users.findOne(idResolver(args));
    },
    users: (root, args, { db }) => {
      const query = filterResolver(db.users, args);
      const pages = paginateResolver(query, args);
      return pages.toArray();
    }
  },
  Mutation: {
    addUser: (root, args, { db }) => {
      return db.users.insertOne(args);
    },
    updateUser: (root, args, { db }) => {
      return db.users.findOneAndUpdate(idResolver(args), updateResolver(args));
    },
    rmUser: (root, args, { db }) => {
      return db.users.findOneAndDelete(idResolver(args)).then(v => !!v);
    }
  },
  User: {
    _id: ({ _id = "" }) => _id.toString(),
    fullName: ({ firstName, lastName }) =>
      [firstName, lastName].filter(v => v).join(" "),
    image: ({ image }) => image || "//placehold.it/180x100"
  }
};
