const basicAuth = require("basic-auth");
const config = require("../config/config");

module.exports = (req, res, next) => {
  const user = basicAuth(req);

  if (
    !user ||
    user.name !== config.auth.username ||
    user.pass !== config.auth.password
  ) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};
