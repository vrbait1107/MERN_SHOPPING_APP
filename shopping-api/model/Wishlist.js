const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Wishlist = new Schema({
  title: {
    type: String,
    default: "Cool Wishlist",
  },
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Wishlist", Wishlist);
