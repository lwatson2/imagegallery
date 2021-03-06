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
const mongodb_uri = process.env["MONGODB_URI"];
// Middleware
app.use(bodyParser.json());

//Connect to mongo db
const conn = mongoose.createConnection(mongodb_uri, {
  useNewUrlParser: true
});
app.use("/", router);
app.use("/image", images);

app.use("/user", users);

//Set static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
module.exports.conn = conn;
