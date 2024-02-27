/* eslint-disable quotes */
/* eslint-disable new-cap */
const mongoose = require("mongoose");
const StaffSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  position: {
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
  password: {
    type: String,
    required: true,
  },
  deleteStatus: {
    type: Boolean,
    require: true,
  },
  role: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    require: true,
  },
});
const StaffModel = mongoose.model("Staff", StaffSchema);
module.exports = StaffModel;
