const Event = require("../models/event.model");
const sendMessage = require("../kafka/kafka.producer");
const eventSchema = require("../validation/event.schema");
const logger = require("../utils/logger");
const { v4: uuidv4 } = require("uuid");

exports.createEvent = async (req, res, next) => {
  try {
    const trackingId = uuidv4();
    const requestBody = eventSchema.parse(req.body);
    const payload = {
      ...requestBody,
      trackingId: trackingId,
      status: "RECEIVED",
      statusMessage: "Request received successfully.",
    };

    const priority = payload.priority || "medium";

    const topic = `priority-${priority}`;

    const event = new Event({
      ...payload,
      priority,
      status: "QUEUED",
      statusMessage: "Successfully delivered to MongoDB.",
    });

    await event.save();

    await sendMessage(topic, payload);

    logger.info("Event stored and sent to kafka", {
      trackingId: payload.trackingId,
    });

    res.status(201).json({
      message: "Event accepted",
      trackingId: payload.trackingId,
    });
  } catch (error) {
    next(error);
  }
};
