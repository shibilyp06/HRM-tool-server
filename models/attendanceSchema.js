/* eslint-disable new-cap */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  attendance: {
    type: Boolean,
    required: true,
  },

  location: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: null,
    required: true,
  },
});
module.exports = new mongoose.model("attendance", attendanceSchema);
