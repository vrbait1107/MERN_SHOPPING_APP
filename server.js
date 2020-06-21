const express = require("express");
const App = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = mongoose.connect("mongodb://localhost/shopping-api");
const Product = require("./model/Product");
const Wishlist = require("./model/Wishlist");

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.listen(3000, function () {
  console.log("Server listening at port");
});
