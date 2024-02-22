/* eslint-disable quotes */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
// const verifyToken = require('../Middleware/jwtVerification');
const {
  signupPost,
  otpVerification,
  loginPost,
  addstaff,
  getStaff,
  editStaff,
} = require("../controllers/adminController");

router.post("/signupPost", signupPost);
router.post("/otpVerification", otpVerification);
router.post("/loginPost", loginPost);
router.post("/addStaff", addstaff);
router.get("/getStaff", getStaff);
router.get("/editStaff/:Id", editStaff);

module.exports = router;
