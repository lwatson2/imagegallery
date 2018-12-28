require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

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
  const Image = db.conn.model("imagesSchema", image.Image);
  Image.find({}).then(function(images) {
    res.json({ images });
  });
});

router.post("/delete", function(req, res) {
  console.log(req.body.itemKey);
  const { itemKey } = req.body;
  console.log(itemKey);
  const param = {
    Bucket: process.env.BUCKET,
    Key: itemKey
  };
  console.log(param);
  const Image = db.conn.model("imagesSchema", image.Image);
  Image.findOneAndRemove({ Key: itemKey }, function(err, result) {
    console.log("test");
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result, "result");
      res.json({ message: "success" });
    }
  });
  /* await s3.deleteObject(param, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
    } // successful response
  }); */
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
