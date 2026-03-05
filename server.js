const mongoose = require("mongoose");
const app = require("./src/app");
const config = require("./src/config/config");
const logger = require("./src/utils/logger");

mongoose.connect(config.mongo.uri).then(() => {
  logger.info("MongoDB connected");

  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });
});
