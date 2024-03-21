/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const officeLOcationModel = require("../models/officeLocationModel");
const StudentModel = require("../models/studentSchema");
const createOrder = require("../utility/razorePay");
const object = {
  createOrder: createOrder,
  studentAttendance: async (req, res) => {
    try {
      const { attendanceData } = req.body;
      const currentLocation = attendanceData.location;
      console.log(currentLocation, " : current location of student");

      // Define the maximum distance in meters (100 meters in this case)

      // Convert longitude and latitude to numbers
      const longitude = parseFloat(currentLocation.longitude);
      const latitude = parseFloat(currentLocation.latitude);

      const nearbyOffices = await officeLOcationModel.find({
        coordinates: {
          $near: {
            $geometry: {
              type: "point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: 1000000,
          },
        },
      });

      console.log(nearbyOffices, " : newr byoffice");
      // Handle the response or further processing here
      res.status(200).json({nearbyOffices});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  },
  getCurrentStudent: async (req, res) => {
    const emailId = req.user.payload;
    try {
      const student = await StudentModel.findOne({ email: emailId });
      res.status(200).json({ message: "data send successfuly", student });
    } catch (err) {
      console.error(err);
      res.status(5000).json({ error: err });
    }
  },
};

module.exports = object;
