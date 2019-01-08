const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
        if (!isMatch) {
          throw "Password did not match";
        }
        resolve(findUser);
      });
    } catch (error) {
      reject("Authorization failed");
      console.log("failed");
    }
  });
};
