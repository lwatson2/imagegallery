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

router.post("/delete", async function(req, res) {
  const { itemKey } = req.body;
  console.log(itemKey);
  const param = {
    Bucket: process.env.BUCKET,
    Key: itemKey
  };
  /* const imageProm = await new Promise(async (resolve, reject) => {
    const Image = db.conn.model("imagesSchema", image.Image);
    await Image.findOneAndRemove({ Key: itemKey }, function(err, result) {
      try {
        if (err) {
          throw err;
        }
        if (result) {
          resolve();
        }
      } catch (error) {}
    });
  });
  const s3Prom = 
    await s3.deleteObject(param, function(err, data) {
      try {
        if (data) {
          resolve();
          console.log("test");
        }
      } catch (err) {
        throw err;
      }
    });
  }); */
  try {
    const Image = db.conn.model("imagesSchema", image.Image);
    await Image.findOneAndRemove({ Key: itemKey }, function(err, result) {
      if (err) {
        throw err;
      }
    });
    await s3.deleteObject(param, function(err, data) {
      if (err) {
        throw err;
      }
    });
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
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
