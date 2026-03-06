const mongoose = require("mongoose");
const { uuid } = require("zod");

const EventSchema = new mongoose.Schema({
  trackingId: String,
  from: String,
  to: String,
  subject: String,
  body: String,
  channel: String,
  priority: String,
  customerId: String,
  status: {
    type: String,
    default: "QUEUED",
  },
  statusMessage: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "NotificationInteraction",
  EventSchema,
  "notification-interactions",
);
