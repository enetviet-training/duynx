const eventsEmitter = require("events");
const events = new eventsEmitter();
const types = require("./eventsConfig");

exports.eventBus = events;
exports.eventsType = types;