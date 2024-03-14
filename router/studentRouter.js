/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/studentController");
router.post("/createOrder", createOrder);

module.exports = router;
