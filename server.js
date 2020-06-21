const express = require("express");
const App = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = mongoose.connect("mongodb://localhost/shopping-api");
const Product = require("./model/Product");
const Wishlist = require("./model/Wishlist");

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.post("/product", function (req, res) {
  //Creating New Object Product
  let product = new Product();

  product.title = req.body.title;
  product.price = req.body.price;

  product.save(function (err, savedProduct) {
    if (err) {
      res.status(500).send({ error: "Could not find Saved Product" });
    } else {
      res.send(savedProduct);
    }
  });
});

App.get("/product", function (request, response) {
  Product.find({}, function (err, products) {
    if (err) {
      response.status(500).send({ error: "Could not get products" });
    } else {
      response.send(products);
    }
  });
});

App.listen(3000, function () {
  console.log("Server listening at port");
});
