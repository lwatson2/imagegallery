const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const crypto = require("crypto");
const config = require("../../config");
const mongoconn = require("../../server");
const router = express.Router();
const db = config.MONGODB_URI;

//Create storage obj
let gfs;
router.use(methodOverride("_method"));

const conn = mongoose.createConnection(config.MONGODB_URI);
conn.once("open", () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("mongoose connected");
});

const storage = new GridFsStorage({
  url: config.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          desc: "test"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// route get /

router.get("/image", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //Check for files
    if (!files || files.length === 0) {
      gfs.files.find().toArray((err, files) => {
        //Check for files
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "No files exist"
          });
        } else {
          files.map(file => {
            if (
              file.contentType === "image/jpeg" ||
              file.contentType === "img/png"
            ) {
              file.isImage = true;
              res.json(file);
            } else {
              file.isImage = false;
            }
          });
        }
      });
    }
  });
});

//route post /upload

router.post("/upload", upload.single("file"), async (req, res) => {
  const newItem = new Item({
    desc: req.body.text
  });
  const savedItem = await newItem.save();
  res.send(savedItem);
  console.log(req.body.text);
  res.redirect("/");
});

router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //Check for files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    }
    if (err) {
      return res.status(501).json({
        err: "Something went wrong"
      });
    }
    return res.send(files);
  });
});

router.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exist"
      });
    }
    // file exists
    return res.json(file);
  });
});
// Desc display single file
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exist"
      });
    }
    //Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
      // Read output to browser
      console.log(file.filename);
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "not a image"
      });
    }
  });
});
//Delete request
// route /files/:id
router.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.redirect("/");
  });
});
module.exports = router;
