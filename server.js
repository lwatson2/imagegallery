const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");

const user = require("./models/User");
const images = require("./routes/api/images");
const users = require("./routes/api/users");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const crypto = require("crypto");
const app = express();

// Middleware
app.use(bodyParser.json());

let newItem;
let gfs;

//Connect to mongo db
const conn = mongoose.createConnection(config.MONGODB_URI);

app.use("/images", images);

app.use("/login", users);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
module.exports.conn = conn;
