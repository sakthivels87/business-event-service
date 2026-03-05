const express = require("express");
const router = express.Router();
const controller = require("../controllers/event.controller");
const auth = require("../middleware/auth.middleware");

router.post("/events", auth, controller.createEvent);

module.exports = router;
