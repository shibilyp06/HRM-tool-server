/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();

const {
  createOrder,
  getCurrentStudent,
  studentAttendance,
} = require("../controllers/studentController");
router.post("/createOrder", createOrder);
router.get("/getCurrentStudent/:emailId", getCurrentStudent);
router.post("/attendance", studentAttendance);

module.exports = router;
