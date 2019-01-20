const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
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
      } catch (err) {}
    });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body.creds;
  try {
    const user = await auth.authenticate(email, password);
    res.json({
      isLoggedIn: true,
      user
    });
  } catch (error) {
    res.json({
      isLoggedIn: false,
      error: true
    });
  }
});
router.post("/signout", async (req, res) => {
  res.json({
    isLoggedIn: false
  });
});

module.exports = router;
