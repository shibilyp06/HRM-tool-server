const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser");
require("dotenv").config();
const port = 5000;
const mongoose = require("./config");
const cors = require("cors");
const adminRouter = require("./router/adminRouter");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("server is connected");
});
