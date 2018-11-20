const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const crypto = require("crypto");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride("_method"));

const db = config.MONGODB_URI;

let gfs;
//Connect to mongo db
const conn = mongoose.createConnection(db);
conn.once("open", () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//Create storage obj
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
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// route get /

app.get("/image", (req, res) => {
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

app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/");
});

app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //Check for files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    }

    return res.json(files);
  });
});

app.get("/files/:filename", (req, res) => {
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
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exist"
      });
    }
    //Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "not a image"
      });
    }
  });
});

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
