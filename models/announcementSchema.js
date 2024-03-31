/* eslint-disable new-cap */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
});

module.exports = new mongoose.model("announcement", announcementSchema);
