/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const jwtMiiddleware = require("../Middleware/jwtVerification");
const {
  createOrder,
  getCurrentStudent,
  studentAttendance,
  getEvents,
} = require("../controllers/studentController");
router.post("/createOrder", jwtMiiddleware, createOrder);
router.post("/attendance", jwtMiiddleware, studentAttendance);
router.get("/getCurrentStudent", jwtMiiddleware, getCurrentStudent);
router.post("/getEvents", getEvents);

module.exports = router;
