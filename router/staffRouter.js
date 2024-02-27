/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();

const { addStudent } = require("../controllers/staffController");

router.post("/addStudent", addStudent);

module.exports = router;

