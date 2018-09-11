const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    me: User
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
    login(email: String!, password: String!): AccessToken

    addUser(
      email: String!
      username: String!
      password: String!
      firstName: String
      lastName: String
      userStatus: Int
      phone: String
      image: String
    ): User

    updateUser(
      username: String
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      userStatus: Int
      image: String
    ): User

    rmUser: Boolean
  }

  type User {
    _id: String
    username: String
    email: String
    password: String
    firstName: String
    lastName: String
    fullName: String
    phone: String
    userStatus: Int
    image: String
  }

  type AccessToken {
    token: String
  }
`;
