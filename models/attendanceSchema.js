/* eslint-disable quotes */
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: null,
    required: true,
  },
});
module.exports = new mongoose.Model("attendance", attendanceSchema);
