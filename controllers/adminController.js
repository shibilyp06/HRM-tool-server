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

  loginPost: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log(req.body, "body");
      const payload = req.body.email;
      // Checking if user exist or not
      const existingUser = await adminModel.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).json({ error: "Wrong admin details" });
      }
      const storedPassword = existingUser.password;
      const comparePassword = await bcrypt.compare(password, storedPassword);
      // Generating JWT token
      if (role == "Admin") {
        if (existingUser && comparePassword) {
          const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
          });
          res.status(200).json({ message: "Logged in successfuly", token });
        } else {
          res.status(404).json({ erroe: "User not found" });
        }
      } else {
        res.status(404).json({ err: "You are not admin" });
      }
    } catch {
      // eslint-disable-next-line quotes
      res.status(400).json({ message: "Some error in login submit" });
    }
  },
  addstaff: async (req, res) => {
    try {
    console.log("second");
    const {
      name,
      email,
      position,
      dob,
      phoneNumber,
      deleteStatus,
      role,
      roles,
    } = req.body;
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
    console.log(req.body, "body");
  },
};

module.exports = object;
