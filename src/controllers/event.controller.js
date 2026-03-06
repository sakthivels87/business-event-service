const Event = require("../models/event.model");
const sendMessage = require("../kafka/kafka.producer");
const eventSchema = require("../validation/event.schema");
const logger = require("../utils/logger");
const { v4: uuidv4 } = require("uuid");

exports.createEvent = async (req, res, next) => {
  try {
    const trackingId = uuidv4();
    const payload = {
      ...req.body,
      trackingid: trackingId,
      status: "QUEUED",
    };
    const priority = payload.priority || "medium";

    const topic = `priority-${priority}`;

    const event = new Event({
      trackingId,
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
