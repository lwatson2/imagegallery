const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const config = require("../../config");
const saltRounds = 10;
const router = express.Router();
const db = require("../../server");
const user = require("../../models/User");
router.get("/", (req, res) => {
  res.json({ hello: "world" });
});
router.post("/signup", (req, res) => {
  const { email } = req.body;
  const User = db.conn.model("User", user.User);
  const newUser = new User({
    email,
    password: config.PASS
  });
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async function(err, hash) {
      newUser.password = hash;
      try {
        const savedItem = await newUser.save();
        res.send(savedItem);
        console.log(savedItem);
      } catch (err) {
        console.log(err);
      }
    });
  });
});

module.exports = router;
