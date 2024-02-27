/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();

const { loginPost } = require("../controllers/commonController");

router.post("/loginPost", loginPost);
module.exports = router;
