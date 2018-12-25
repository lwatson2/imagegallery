const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
  Link: {
    type: String
  },
  Key: {
    type: String
  }
});

module.exports = Images = mongoose.model("imagesSchema", ImagesSchema);
