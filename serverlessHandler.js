const { ApolloServer } = require("apollo-server-lambda");
const graphqlConfig = require("./src/graphql");
const context = require("./src/graphql/context");

module.exports.main = new ApolloServer(
  Object.assign({}, graphqlConfig, { context })
);
