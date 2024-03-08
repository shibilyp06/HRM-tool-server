/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const verifyToken = async (req, res, next) => {
  try {
    let token = await req.headers.authorization;
    token = token.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: " Unauthorized user " });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("ERROR", err);
  }
};
module.exports = verifyToken;
