const adminModel = require("../model/adminSchema");
const bcrypt = require("bcryptjs");
const twilio = require("../utility/twilio");
const object = {
  signupPost: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // signup form logic
      const existingUser = await adminModel.findOne({ email: email });
      // bcrypting password
      const hashedPassword = await bcrypt.hash(password, 10);
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
  otpVerification: (req, res) => {
    try {
      const Number = req.body;
      twilio(Number);
      res.status(200).json({ message: "OTP send successfully" });
    } catch {
      res.status(400).json({ message: " Some error in otp verification " });
    }
  },
  loginPost: async (req, res) => {
    // try {
      const { email, password } = req.body;
      const existingUser = await adminModel.findOne({ email });
      const storedPassword = existingUser.password
      const comparePassword = await bcrypt.compare(password,storedPassword)
      if (existingUser && comparePassword) {
        res.status(200).json({ message: "Logged in successfuly" });
      } else {
        res.status(404).json({ message: "User not fount" });
      }
    // } catch {
      
    //   res.status(400).json({ message: "Some error in login submit" });
    // }
  },
};

module.exports = object;
