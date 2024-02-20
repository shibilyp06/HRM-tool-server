/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
// const verifyToken = require('../Middleware/jwtVerification');
const {
  signupPost,
  otpVerification,
  loginPost,addstaff
} = require('../controllers/adminController');

router.post('/signupPost', signupPost);
router.post('/otpVerification', otpVerification);
router.post('/loginPost', loginPost);
router.post('/addStaff', addstaff);

module.exports = router;
