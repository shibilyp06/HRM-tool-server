/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { upload, s3 } = require("../utility/multer");

const {
  addStudent,
  getStudents,
  editStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/staffController");

router.post("/addStudent", upload.single("imgURL"), addStudent);
router.get("/getStudents", getStudents);
router.get("/editStudent/:Id", editStudent);
router.put("/updateStudent", updateStudent);
router.patch("/deleteStudent/:Id", deleteStudent);

module.exports = router;
