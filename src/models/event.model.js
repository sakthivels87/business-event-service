const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  trackingid: String,
  from: String,
  to: String,
  subject: String,
  body: String,
  channel: String,
  priority: String,
  customerid: String,
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
