const merge = require("lodash/merge");
const flatten = require("lodash/flatten");

module.exports = (...resources) => ({
  resolvers: merge(...resources.map(({ resolvers }) => resolvers)),
  typeDefs: flatten(resources.map(({ typeDefs }) => typeDefs))
});
