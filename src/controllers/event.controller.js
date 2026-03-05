const Event = require("../models/event.model");
const sendMessage = require("../kafka/kafka.producer");
const eventSchema = require("../validation/event.schema");
const logger = require("../utils/logger");

exports.createEvent = async (req, res, next) => {
  try {
    const payload = eventSchema.parse(req.body);

    const priority = payload.priority || "medium";

    const topic = `priority-${priority}`;

    const event = new Event({
      ...payload,
      priority,
      status: "QUEUED",
    });

    await event.save();

    await sendMessage(topic, payload);

    logger.info("Event stored and sent to kafka", {
      trackingid: payload.trackingid,
    });

    res.status(201).json({
      message: "Event accepted",
      trackingid: payload.trackingid,
    });
  } catch (error) {
    next(error);
  }
};
