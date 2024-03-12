/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const StudentModel = require("../models/studentSchema");
const bcrypt = require("bcryptjs");
const StaffModel = require("../models/StaffSchema");
const AdminModel = require("../models/adminSchema");
const { log } = require("console");
const object = {
  addStudent: async (req, res) => {
    try {
      const { name, email, course, dob, phoneNumber } = req.body;
      const imgURL = req.file.location;
      const existingUser = await StudentModel.findOne({ email: email });
      // Creating  password for staff

      const password = name.slice(0, 3) + dob.slice(2, 4) + dob.split("-")[2];
       console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(" finally ");
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
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Found some error in saving student" });
    }
  },
  getStudents: async (req, res) => {
    try {
      const payload = req.user;
      const students = await StudentModel.find({ deleteStatus: false });
      res.status(200).json({
        message: "collected data from database",
        staffEmail: payload,
        students,
      });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  editStudent: async (req, res) => {
    const { Id } = req.params;
    try {
      const editingStudent = await StudentModel.findById(Id);
      res
        .status(200)
        .json({ message: "Data sebd successfuly", editingStudent });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error " });
    }
  },
  updateStudent: async (req, res) => {
    const { name, email, course, dob, phoneNumber } = req.body;
    console.log(email, "kk");
    const userId = await StudentModel.findOne({ email: email });
    try {
      const updateStaff = await StudentModel.findByIdAndUpdate(
        userId._id,
        {
          name: name,
          email: email,
          course: course,
          dob: dob,
          phoneNumber: phoneNumber,
        },
        { new: true }
      );
      res.status(200).json({ message: "Student data updated successfuly" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const { Id } = req.params;
      console.log(Id);
      await StudentModel.findByIdAndUpdate(
        Id,
        { deleteStatus: true },
        { new: true }
      );
      const staffs = await StaffModel.find({ deleteStatus: false });
      res.status(200).json({ message: "staff deleted successfuly", staffs });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getAdmin: async (req, res) => {
    try {
      console.log(" reached here ");
      const admin = await AdminModel.find();
      res.status(200).json({ message: "Got Admins", admin });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Internal server error" });
    }
  },
  getMe: async (req, res) => {
    try {
      const { emailId } = req.params;
      console.log(emailId, "staff email");
      const staff = await StaffModel.findOne({ email: emailId });
      res.status(200).json({ message: "data send successfuly", staff });
    } catch (err) {
      console.error(err);
      res.status(5000).json({ error: err });
    }
  },
};
module.exports = object;
