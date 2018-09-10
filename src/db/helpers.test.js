/* global describe test expect */

const { idResolver, updateResolver } = require("./helpers");

describe("GraphQl Helpers", () => {
  test("Should convert id to ObjectId", () => {
    const { _id } = idResolver({ id: "5b956af77ab3bd3042a615f1" });
    expect(_id).toEqual(
      expect.objectContaining({
        toString: expect.any(Function),
        _bsontype: expect.any(String)
      })
    );
    expect(_id.toString()).toEqual("5b956af77ab3bd3042a615f1");
  });

  test("Should use _id", () => {
    const supplied = "5b956af77ab3bd3042a615f1";
    const { _id } = idResolver({ _id: supplied });
    expect(_id).toBe(supplied);
  });

  describe("Update mutation", () => {
    test("Should set name", () => {
      expect(updateResolver({ name: "KDot" })).toEqual({
        $set: {
          name: "KDot"
        }
      });
    });

    test("Should unset name", () => {
      expect(updateResolver({ name: null })).toEqual({
        $unset: {
          name: ""
        }
      });
    });

    test("Should increment value", () => {
      expect(updateResolver({ $inc: { counter: 1 } })).toEqual({
        $inc: {
          counter: 1
        }
      });
    });

    test("Should push value", () => {
      expect(
        updateResolver({
          $push: { topics: "cat" },
          $inc: { counter: 1 },
          name: "KDot",
          lastName: null
        })
      ).toEqual({
        $set: {
          name: "KDot"
        },
        $unset: {
          lastName: ""
        },
        $inc: { counter: 1 },
        $push: {
          topics: "cat"
        }
      });
    });
  });
});
