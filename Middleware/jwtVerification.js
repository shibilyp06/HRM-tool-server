const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const verifyToken = (req, res, next)=>{
  let token = req.headers.authorization;
  token = token.split(' ')[1];
  console.log(token, 'token');
  if (!token) {
    return res.status(401).json({message: 'It is restricted for you'});
  }
  jwt.verify(token, secretKey, (err, decoded)=>{
    if (err) {
      res.status(401).json({message: 'Invalid token'});
    }
    req.user = decoded;
  });
};
module.exports = verifyToken;
