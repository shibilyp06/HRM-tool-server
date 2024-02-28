/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bucket = process.env.S3_BUCKET_NAME;
const region = process.env.S3_REGION;
const s3 = new S3Client({
  credentials: {
    region,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});
const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
module.exports = { upload, s3 };
