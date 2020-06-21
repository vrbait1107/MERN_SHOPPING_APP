const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  title: String,
  price: Number,
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", Product);
