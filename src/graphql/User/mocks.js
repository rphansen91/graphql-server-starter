const { MockList } = require("graphql-tools");
const casual = require("casual");

module.exports = {
  User: () => ({
    username: casual.username,
    email: casual.email,
    password: casual.password,
    firstName: casual.first_name,
    lastName: casual.last_name,
    phone: casual.phone,
    image: "//placehold.it/180x100",
    userStatus: casual.integer(0, 5)
  }),
  Query: () => ({
    users: (_, { limit = 3 }) => new MockList(limit)
  })
};
