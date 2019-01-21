const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const db = require("./server");
const UserSchema = require("./models/User");

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    const User = db.conn.model("User", UserSchema.User);
    try {
      const findUser = await User.findOne({ email });
      bcrypt.compare(password, findUser.password, function(err, isMatch) {
        if (err) {
          throw err;
        }

        resolve(findUser);
      });
    } catch (error) {
      reject("Authorization failed");
    }
  });
};
