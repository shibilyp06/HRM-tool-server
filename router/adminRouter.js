/* eslint-disable object-curly-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable quotes */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
// const verifyToken = require('../Middleware/jwtVerification');
const { upload } = require("../utility/multer");
const {
  signupPost,
  otpVerification,
  addstaff,
  getStaff,
  editStaff,
  deleteStaff,
  updateStaff,
} = require("../controllers/adminController");
const jwtMiddleware = require("../Middleware/jwtVerification");

router.post("/signupPost", signupPost);
router.post("/otpVerification", otpVerification);
router.post("/addStaff", upload.single("imgURL"), addstaff);
router.get("/getStaff", jwtMiddleware, getStaff);
router.put("/editStaff/:Id", jwtMiddleware, editStaff);
router.post("/deleteStaff/:Id", deleteStaff);
router.put("/updateStaff", updateStaff);

module.exports = router;
