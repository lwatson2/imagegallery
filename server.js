require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const router = express.Router();
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

//Connect to mongo db
const conn = mongoose.createConnection(config.MONGODB_URI);
app.use("/", router);
app.use("/image", images);

app.use("/user", users);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
module.exports.conn = conn;
