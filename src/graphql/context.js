module.exports = root => {
  const token = root.req.headers["x-auth-token"];
  return {};
};
