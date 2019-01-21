require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Image_Collection = "imagesschemas";
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const BUCKET = process.env["BUCKET"];
const S3_SECRET_ACCESS_KEY = process.env["S3_SECRET_ACCESS_KEY"];
const S3_ACCESS_KEY_ID = process.env["S3_ACCESS_KEY_ID"];
const params = {
  Bucket: BUCKET
};
const db = require("../../server");
const image = require("../../models/Image");
aws.config.update({
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  accessKeyId: S3_ACCESS_KEY_ID,
  region: "us-east-2",
  signatureVersion: "v4"
});

const s3 = new aws.S3({
  params: { Bucket: BUCKET }
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
  /*  if (error) {
    console.log(error.message, error.data);
  } */
  const Image = db.conn.model("imagesSchema", image.Image);
  Image.find({}).then(images => {
    res.json({ images });
  });
});

router.post("/delete", async function(req, res) {
  const { itemKey } = req.body.params;
  const param = {
    Bucket: BUCKET,
    Key: itemKey
  };
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
  } catch (error) {}
});
router.get("/RandomImage", async function(req, res) {
  await db.conn
    .collection("imagesschemas")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, docs) => {
      if (err) {
      } else {
        res.status(200).json(docs);
      }
    });
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
  res.redirect("/");
});

module.exports = router;
