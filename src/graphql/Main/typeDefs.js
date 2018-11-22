const { default: gql } = require("graphql-tag");

module.exports = gql`

scalar JSON

input Paginate {
  NextToken: String
  MaxResults: Int

  Marker: String
  MaxItems: Int
  MaxKeys: Int
}

type Query {
  active: Boolean
  ready: Boolean
}

type Mutation {
  active: Boolean
  ready: Boolean
}
`;
