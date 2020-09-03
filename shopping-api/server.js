const express = require("express");
const App = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = mongoose.connect("mongodb://localhost/shopping-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Cross Origin Issue
App.use(cors());

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

const productRouter = require("./routes/product");
const wishlistRouter = require("./routes/wishlist");

App.use(productRouter);
App.use(wishlistRouter);

App.listen(5000, function () {
  console.log("Server listening at port 5000");
});
