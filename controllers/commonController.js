/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */

const staffModel = require("../models/StaffSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminSchema");
const StudentModel = require("../models/studentSchema");
const StaffModel = require("../models/StaffSchema");

const object = {
  loginPost: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log(req.body, "body");
      const payload = req.body.email;
      // Checking if user exist or not
      // eslint-disable-next-line object-curly-spacing
      const existingUser =
        (await adminModel.findOne({ email: email })) ||
        (await staffModel.findOne({ email })) ||
        (await StudentModel.findOne({ email }));
      if (!existingUser) {
        return res.status(401).json({ error: "This email dosn't exist " });
      }
      const storedPassword = existingUser.password;
      const comparePassword = await bcrypt.compare(password, storedPassword);
      console.log(comparePassword);
      // Generating JWT token
      if (comparePassword) {
        const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        res.status(200).json({
          message: "Logged in successfuly",
          token,
          role: existingUser.role,
        });
      } else {
        res.status(401).json({ error: "Wrong Role or password" });
      }
    } catch {
      // eslint-disable-next-line quotes
      res.status(400).json({ message: "Some error in login submit" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const { searchQuery } = req.query;

      const regex = new RegExp(searchQuery, "i");
      const allStaff = await StaffModel.find({ name: regex });
      const allStudent = await StudentModel.find({ name: regex });
      res.status(200).json({ allStaff, allStudent });
    } catch (err) {
      console.error(err);
      res.status(400).json({ err });
    }
  },
};
module.exports = object;
