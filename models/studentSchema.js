/* eslint-disable new-cap */
/* eslint-disable quotes */
const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  deleteStatus: {
    type: Boolean,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
});
const StudentModel = new mongoose.model("Student", StudentSchema);
module.exports = StudentModel;
