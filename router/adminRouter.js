/* eslint-disable quotes */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
// const verifyToken = require('../Middleware/jwtVerification');
const { s3, upload } = require("../utility/multer");
const {
  signupPost,
  otpVerification,
  addstaff,
  getStaff,
  editStaff,
  deleteStaff,
  updateStaff,
} = require("../controllers/adminController");
// const verifyToken = require("../Middleware/jwtVerification");

router.post("/signupPost", signupPost);
router.post("/otpVerification", otpVerification);
router.post("/addStaff", upload.single("imgURL"), addstaff);
router.get("/getStaff", getStaff);
router.put("/editStaff/:Id", editStaff);
router.post("/deleteStaff/:Id", deleteStaff);
router.put("/updateStaff", updateStaff);

module.exports = router;
