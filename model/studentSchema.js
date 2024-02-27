/* eslint-disable quotes */
const { url } = require("inspector");
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
const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;