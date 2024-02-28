/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { upload, s3 } = require("../utility/multer");

const { addStudent, getStudents } = require("../controllers/staffController");

router.post("/addStudent", upload.single("imgURL"), addStudent);
router.get("/getStudents", getStudents);

module.exports = router;
