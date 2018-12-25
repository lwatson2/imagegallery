require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const params = {
  Bucket: process.env.BUCKET
};
const db = require("../../server");
const image = require("../../models/Image");
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

router.post("/delete", async function(req, res) {
  const param = {
    Bucket: process.env.BUCKET,
    Key: req.body.itemKey
  };
  await s3
    .deleteObject(param, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        console.log("success");
      } // successful response
      /*
    data = {
    }
    */
    })
    .promise();
});

router.post("/image-upload", upload.array("image", 1), async function(
  req,
  res
) {
  const { key, location } = req.files[0];
  const Image = db.conn.model("imagesSchema", image.Image);
  const newImage = new Image({
    Link: location,
    Key: key
  });
  await newImage.save();
  return res.redirect("/");
});

module.exports = router;
