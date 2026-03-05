const { z } = require("zod");

const eventSchema = z.object({
  trackingid: z.string().uuid(),
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  channel: z.string(),
  priority: z.enum(["high", "medium", "low"]).optional(),
  customerid: z.string(),
});

module.exports = eventSchema;
