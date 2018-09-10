const { ObjectID } = require("mongodb");

const idResolver = ({ id, _id }) => (_id ? { _id } : { _id: ObjectID(id) });

const filterResolver = (collection, { query, search }) => {
  if (query) {
    return collection.find(JSON.parse(decodeURIComponent(query)));
  } else if (search) {
    return collection.find({
      $text: {
        $search: search,
        $caseSensitive: false
      }
    });
  } else {
    return collection.find({});
  }
};

const paginateResolver = (query, { sort = "_id", order = 1, page, limit }) => {
  let q = query;
  if (limit) q = q.sort({ [sort]: order }).limit(limit);
  if (limit && page) q = q.skip(Math.max(page - 1, 0) * limit);
  return q;
};

const updateResolver = (args, exclude = { id: true, _id: true }) => {
  return Object.keys(args)
    .filter(key => key && !exclude[key])
    .reduce((acc, key) => {
      if (key[0] === "$") {
        acc[key] = args[key];
      } else if (args[key] === null) {
        if (!acc.$unset) acc.$unset = {};
        acc.$unset[key] = "";
      } else {
        if (!acc.$set) acc.$set = {};
        acc.$set[key] = args[key];
      }
      return acc;
    }, {});
};

module.exports = {
  idResolver,
  filterResolver,
  paginateResolver,
  updateResolver
};
