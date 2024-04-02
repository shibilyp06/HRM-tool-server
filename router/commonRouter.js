/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();

const { loginPost, getAllUsers } = require("../controllers/commonController");

router.post("/loginPost", loginPost);
router.get("/searchQuery", getAllUsers);
module.exports = router;
