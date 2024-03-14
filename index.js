/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const port = 5000;
// Requiring mongoose
const mongoose = require("./config/config");
const cors = require("cors");

//  All routers
const adminRouter = require("./router/adminRouter");
const staffRouter = require("./router/staffRouter");
const commonRouter = require("./router/commonRouter");
const studentRouter = require("./router/studentRouter");
// seting cors
app.use(cors());

// setting bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
app.use("/", commonRouter);
app.use("/admin", adminRouter);
app.use("/staff", staffRouter);
app.use("/student", studentRouter);

// Server Listening
app.listen(port, () => {
  console.log("server is connected");
});
