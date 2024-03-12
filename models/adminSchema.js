/* eslint-disable quotes */
/* eslint-disable new-cap */
const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
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
const AdminModel = new mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
