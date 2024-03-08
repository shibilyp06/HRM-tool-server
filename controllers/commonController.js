/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */

const staffModel = require("../model/StaffSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../model/adminSchema");

/* eslint-disable quotes */
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
        (await staffModel.findOne({ email }));
      if (!existingUser) {
        return res.status(401).json({ error: "This email dosn't exist " });
      }
      const storedPassword = existingUser.password;
      const comparePassword = await bcrypt.compare(password, storedPassword);
      // Generating JWT token
      if (existingUser && comparePassword) {
        const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        res.status(200).json({
          message: "Logged in successfuly",
          token,
          role: existingUser.role,
        });
      } else {
        res.status(401).json({ erroe: "User not found" });
      }
    } catch {
      // eslint-disable-next-line quotes
      res.status(400).json({ message: "Some error in login submit" });
    }
  },
};
module.exports = object;
