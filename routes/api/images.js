require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const params = {
  Bucket: process.env.BUCKET
};
aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: "us-east-2",
  signatureVersion: "v4"
});

const s3 = new aws.S3({
  params: { Bucket: process.env.BUCKET }
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "bucket-owner-full-control",
    bucket: "imagegallerynode",
    key: function(req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString() + ".jpg");
    }
  })
});

router.get("/getimages", function(req, res) {
  s3.listObjects(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred

    res.json({
      data
    });
  });
});

router.post("/image-upload", upload.array("image", 1), function(req, res) {
  return res.send("Uploaded");
});

module.exports = router;
