const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    user(id: String!): User
    users(
      limit: Int
      page: Int
      sort: String
      order: String
      query: String
      search: String
    ): [User]
  }

  extend type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      firstName: String
      lastName: String
      phone: String
      userStatus: Int
      image: String
    ): User

    updateUser(
      id: String!
      username: String
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      userStatus: Int
      image: String
    ): User

    rmUser(id: String!): Boolean
  }

  type User {
    _id: String
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    fullName: String
    phone: String
    userStatus: Int
    image: String
  }
`;
