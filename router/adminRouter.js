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
  deleteStaff,
} = require("../controllers/adminController");
// const verifyToken = require("../Middleware/jwtVerification");

router.post("/signupPost", signupPost);
router.post("/otpVerification", otpVerification);
router.post("/loginPost", loginPost);
router.post("/addStaff", addstaff);
router.get("/getStaff", getStaff);
router.put("/editStaff/:Id", editStaff);
router.post("/deleteStaff/:Id", deleteStaff);

module.exports = router;
