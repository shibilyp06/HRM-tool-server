/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const adminModel = require("../model/adminSchema");
const bcrypt = require("bcryptjs");
const twilio = require("../utility/twilio");
const jwt = require("jsonwebtoken");
const StaffModel = require("../model/StaffSchema");

const object = {
  // signup form logic
  signupPost: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await adminModel.findOne({ email });
      // bcrypting password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Saving User
      if (!existingUser) {
        const newAdmin = await new adminModel({
          name: name,
          email: email,
          password: hashedPassword,
        }).save();
        res.status(200).json({ message: "Data saved successfully" });
      } else {
        res.status(400).json({ message: "User already exist" });
      }
    } catch {
      res.status(400).json({ message: "Signup error" });
    }
  },

  // /  OTP Verification

  otpVerification: (req, res) => {
    try {
      const Number = req.body;
      // Sending OTP through TWILIO
      twilio(Number);
      res.status(200).json({ message: "OTP send successfully" });
    } catch {
      res.status(400).json({ message: " Some error in otp verification " });
    }
  },
  addstaff: async (req, res) => {
    try {
      console.log("second");
      const { name, email, position, dob, phoneNumber } = req.body;
      const imgURL = req.file.location;
      console.log(imgURL, "image frombackend");
      const existingUser = await StaffModel.findOne({ email: email });
      // Creating  password for staff
      const password = name.slice(0, 3) + dob.slice(2, 4) + dob.split("-")[2];
      console.log(password, "before");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword, "after");
      // Saving Staff
      if (!existingUser) {
        const staffData = await new StaffModel({
          name: name,
          email: email,
          position: position,
          dob: dob,
          phoneNumber: phoneNumber,
          password: hashedPassword,
          deleteStatus: false,
          role: "Staff",
          roles: [],
          imgURL: imgURL,
        }).save();
        res.status(200).json({ message: "Data saved successfully" });
      } else {
        res.status(400).json({ message: "User already exist" });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Found some error in saving Staff" });
    }
  },
  getStaff: async (req, res) => {
    try {
      const allStaff = await StaffModel.find({ deleteStatus: false });
      res.status(200).json({ message: "Data send to frontend", allStaff });
    } catch {
      res.status(400).json({ message: "Fetching error" });
    }
  },
  editStaff: async (req, res) => {
    try {
      const Id = req.params.Id;
      const editingStaff = await StaffModel.findOne({ _id: Id });
      res
        .status(200)
        .json({ message: "response send successfully", editingStaff });
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteStaff: async (req, res) => {
    try {
      const { Id } = req.params;
      console.log(Id);
      await StaffModel.findByIdAndUpdate(
        Id,
        { deleteStatus: true },
        { new: true }
      );
      const staffs = await StaffModel.find({ deleteStatus: false });
      res.status(200).json({ message: "staff deleted successfuly", staffs });
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateStaff: async (req, res) => {
    const { name, email, position, dob, phoneNumber } = req.body;
    const userId = await StaffModel.findOne({ email });
    try {
      const updateStaff = await StaffModel.findByIdAndUpdate(
        userId._id,
        {
          name: name,
          email: email,
          position: position,
          dob: dob,
          phoneNumber: phoneNumber,
        },
        { new: true }
      );
      res.status(200).json({ message: "Staff data updated successfuly" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = object;
