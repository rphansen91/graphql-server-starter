const GraphQLJSON = require("graphql-type-json");

module.exports = {
  Query: {
    active: () => true,
    ready: () => true
  },
  Mutation: {
    active: () => true,
    ready: () => true
  },
  JSON: GraphQLJSON
};
