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

  loginPost: async (req, res) => {
    try {
      const { email, password } = req.body;
      const payload = req.body;
      // Checking if user exist or not
      const existingUser = await adminModel.findOne({ email });
      const storedPassword = existingUser.password;
      const comparePassword = await bcrypt.compare(password, storedPassword);
      // Generating JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 60*5,
      });

      if (existingUser && comparePassword) {
        res.status(200).json({ message: "Logged in successfuly", token });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch {
      // eslint-disable-next-line quotes
      res.status(400).json({ message: "Some error in login submit" });
    }
  },
  addstaff: async (req, res) => {
    try {
      const { name, email, position, dob, phoneNumber } = req.body;
      const existingUser = await StaffModel.findOne({ email: email });
      // Creating  password
      console.log("hi");
      const password = name.slice(0, 3) + dob.slice(2, 4) + dob.split("-")[2];
      // const password =
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(password);
      // Saving Staff
      if (!existingUser) {
        const staffData = await new StaffModel({
          name: name,
          email: email,
          position: position,
          dob: dob,
          phoneNumber: phoneNumber,
          password: hashedPassword,
        }).save();
        res.status(200).json({ message: "Data saved successfully" });
      } else {
        res.status(400).json({ message: "User already exist" });
      }
    } catch {
      res.status(400).json({ message: "Found some error in saving Staff" });
    }
  },
  getStaff: async (req, res) => {
    try {
      const allStaff = await StaffModel.find();
      res.status(200).json({ message: "Data send to frontend", allStaff });
    } catch {
      res.status(400).json({ message: "Fetching error" });
    }
  },
  editStaff: async (req, res) => {
    console.log("kooijj");
    const Id = req.params.Id;
    console.log(Id);
    const editingStaff = await StaffModel.findOne({ _id: Id });
    console.log(editingStaff, " kiity");
  },
};

module.exports = object;
