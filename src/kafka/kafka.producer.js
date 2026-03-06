const { Kafka } = require("kafkajs");
const config = require("../config/config");
const logger = require("../utils/logger");

const kafka = new Kafka(config.kafka);

const producer = kafka.producer();

const sendMessage = async (topic, message) => {
  await producer.connect();

  await producer.send({
    topic,
    messages: [
      {
        key: message?.customerId,
        value: JSON.stringify(message),
      },
    ],
  });

  logger.info(`Message sent to topic ${topic}`);
};

module.exports = sendMessage;
