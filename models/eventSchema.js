/* eslint-disable new-cap */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  programs: {
    type: Array,
    required: true,
  },
});

module.exports = new mongoose.model("events", eventSchema);
