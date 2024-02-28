/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const StudentModel = require("../model/studentSchema");
const bcrypt = require("bcryptjs");
const object = {
  addStudent: async (req, res) => {
    try {
      const { name, email, course, dob, phoneNumber, imgURL } = req.body;
      console.log(req.body, " from body");
      console.log(imgURL, "email");
      const existingUser = await StudentModel.findOne({ email: email });
      // Creating  password for staff
      const password = name.slice(0, 3) + dob.slice(2, 4) + dob.split("-")[2];
      console.log(password, "before");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword, "after");
      // Saving Staff
      if (!existingUser) {
        const studentData = await new StudentModel({
          name: name,
          email: email,
          course: course,
          dob: dob,
          phoneNumber: phoneNumber,
          password: hashedPassword,
          deleteStatus: false,
          imgURL: imgURL,
          role: "Student",
        }).save();
        res.status(200).json({ message: "Data saved successfully" });
      } else {
        res.status(400).json({ message: "User already exist" });
      }
    } catch {
      res.status(400).json({ message: "Found some error in saving student" });
    }
  },
  getStudents: async (req, res) => {
    try {
      const students = await StudentModel.find({ deleteStatus: false });
      res
        .status(200)
        .json({ message: "collected data from database", students });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
module.exports = object;
