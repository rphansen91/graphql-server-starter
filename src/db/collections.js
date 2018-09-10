const usersCollection = {
  name: "users",
  init: collection => {
    return Promise.all([
      collection.createIndex({ username: 1 }, { unique: 1 }),
      collection.createIndex({ email: 1 }, { unique: 1 })
    ]);
  }
};

module.exports = [usersCollection];
