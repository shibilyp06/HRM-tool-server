/* eslint-disable quotes */
/* eslint-disable new-cap */
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
const adminModel = new mongoose.model("Admin", adminSchema);
module.exports = adminModel;
