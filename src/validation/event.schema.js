const { z } = require("zod");

const eventSchema = z.object({
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  channel: z.string(),
  priority: z.enum(["high", "medium", "low"]).optional(),
  customerId: z.string(),
});

module.exports = eventSchema;
