const { ApolloServer } = require("apollo-server");
const graphqlConfig = require("./graphql");
const context = require("./graphql/context");

const PORT = process.env.PORT || 3000;
const server = new ApolloServer(Object.assign({}, graphqlConfig, { context }));

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`http://localhost:${PORT}`);
});
