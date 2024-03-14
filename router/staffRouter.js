/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { upload, s3 } = require("../utility/multer");
const jwtMiddleware = require("../Middleware/jwtVerification");
const {
  addStudent,
  getStudents,
  editStudent,
  updateStudent,
  deleteStudent,
  getAdmin,
  getMe,
} = require("../controllers/staffController");

router.post("/addStudent", upload.single("imgURL"), addStudent);
router.get("/getStudents", jwtMiddleware, getStudents);
router.get("/editStudent/:Id", editStudent);
router.put("/updateStudent", updateStudent);
router.patch("/deleteStudent/:Id", deleteStudent);
router.get("/getAdmin", getAdmin);
router.get("/getMe/:emailI", getMe);

module.exports = router;
