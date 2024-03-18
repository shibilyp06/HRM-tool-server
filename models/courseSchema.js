/* eslint-disable new-cap */
/* eslint-disable quotes */
const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: {
    type: Array,
    required: true,
  },
});
const courseModel = new mongoose.model("course", courseSchema);
module.exports = courseModel;
