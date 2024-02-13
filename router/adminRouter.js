const express = require("express");
const router = express.Router();
const {
  signupPost,
  otpVerification,
  loginPost,
} = require("../controllers/adminController");

router.post("/signupPost", signupPost);
router.post("/otpVerification", otpVerification);
router.post("/loginPost", loginPost);

module.exports = router;
