/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();

const {
  createOrder,
  getCurrentStudent,
} = require("../controllers/studentController");
router.post("/createOrder", createOrder);
router.get("/getCurrentStudent", getCurrentStudent);

module.exports = router;
