const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const user = require("./models/User");
const images = require("./routes/api/images");
const users = require("./routes/api/users");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const app = express();
const MONGODB_URI =
  "mongodb://Logan:logan1@ds211724.mlab.com:11724/image_gallery";

// Middleware
app.use(bodyParser.json());

//Connect to mongo db
const conn = mongoose.createConnection(MONGODB_URI, {
  useNewUrlParser: true
});
app.use("/", router);
app.use("/image", images);

app.use("/user", users);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use("/static", express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
module.exports.conn = conn;
