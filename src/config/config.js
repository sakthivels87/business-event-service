require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,

  mongo: {
    uri: process.env.MONGO_URI,
  },

  kafka: {
    clientId: "business-event-service",
    brokers: ["localhost:9092"],
  },

  auth: {
    username: process.env.API_USER,
    password: process.env.API_PASS,
  },
};
