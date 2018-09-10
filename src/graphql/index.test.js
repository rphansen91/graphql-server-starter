/* global describe test expect */
const { resolvers } = require("./");

describe("GraphQl", () => {
  test("Should configure a server", () => {
    const gqlResolver = expect.objectContaining({
      Query: expect.objectContaining({
        active: expect.any(Function)
      }),
      Mutation: expect.objectContaining({
        active: expect.any(Function)
      })
    });

    expect(resolvers).toEqual(gqlResolver);
  });
});
