const merge = require("lodash/merge");
const { gql } = require("apollo-server");

const {
  typeDefs: User,
  resolvers: userResolvers,
  mocks: userMocks
} = require("./User");

const MOCKS = process.env.MOCKS; //|| true;

const Query = gql`
  type Query {
    active: Boolean
    ready: Boolean
  }
`;

const Mutation = gql`
  type Mutation {
    active: Boolean
    ready: Boolean
  }
`;

const activeResolvers = {
  Query: {
    active: () => true,
    ready: () => true
  },
  Mutation: {
    active: () => true,
    ready: () => true
  }
};

module.exports = {
  resolvers: merge(activeResolvers, userResolvers),
  typeDefs: [Query, Mutation, User],
  mocks: MOCKS && merge(userMocks)
};
