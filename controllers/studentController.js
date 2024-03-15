/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const StudentModel = require("../models/studentSchema");
const createOrder = require("../utility/razorePay");
const object = {
  createOrder: createOrder,
  getCurrentStudent: async (req, res) => {
    try {
      const { emailId } = req.params;
      console.log(emailId, "student email");
      const student = await StudentModel.findOne({ email: emailId });
      res.status(200).json({ message: "data send successfuly", student });
    } catch (err) {
      console.error(err);
      res.status(5000).json({ error: err });
    }
  },
};

module.exports = object;
