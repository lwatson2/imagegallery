const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  desc: {
    type: String
  }
});

module.exports = Item = mongoose.model("itemSchema", ItemSchema);
