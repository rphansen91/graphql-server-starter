/* global describe test expect */

const { resolvers } = require("./");

describe("GraphQl User", () => {
  test("Should create a server", () => {
    const gqlResolver = expect.objectContaining({
      Query: expect.objectContaining({
        user: expect.any(Function),
        users: expect.any(Function)
      }),
      Mutation: expect.objectContaining({
        addUser: expect.any(Function),
        rmUser: expect.any(Function),
        updateUser: expect.any(Function)
      })
    });

    expect(resolvers).toEqual(gqlResolver);
  });
});
