const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "ZodError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
};
