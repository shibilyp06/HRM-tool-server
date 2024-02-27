/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const port = 5000;
const mongoose = require("./config");
const cors = require("cors");
const adminRouter = require("./router/adminRouter");
const staffRouter = require("./router/staffRouter");
const commonRouter = require("./router/commonRouter");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", commonRouter);
app.use("/staff", staffRouter);
app.use("/admin", adminRouter);


app.listen(port, () => {
  console.log("server is connected");
});
