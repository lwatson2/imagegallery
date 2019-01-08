const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const config = require("../../config");
const auth = require("../../auth");
const saltRounds = 10;
const router = express.Router();
const db = require("../../server");
const user = require("../../models/User");

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
      } catch (err) {
        console.log(err);
      }
    });
  });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.creds;
  console.log(email, "email", password, "password");
  try {
    const user = await auth.authenticate(email, password);
    console.log(user);
    res.json({
      isLoggedIn: true
    });
  } catch (error) {
    res.json({
      isLoggedIn: false
    });
  }
});
router.post("/signout", async (req, res) => {
  res.json({
    isLoggedIn: false
  });
});

module.exports = router;
