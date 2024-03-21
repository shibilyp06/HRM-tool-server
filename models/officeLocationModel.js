/* eslint-disable new-cap */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const mongoose = require("mongoose");

const officeLOcationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: false,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number], // Array of longitude and latitude
      index: "2dsphere",
    },
  },
});

// Add a 2dsphere index to the location field
// officeLOcationSchema.index({ location: "2dsphere" });


const officeLocationModel = new mongoose.model(
  "officeLocation",
  officeLOcationSchema
);

module.exports = officeLocationModel;
