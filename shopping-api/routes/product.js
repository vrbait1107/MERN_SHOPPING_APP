const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.post("/product", function (req, res) {
  //Creating New Object Product
  let product = new Product();

  product.title = req.body.title;
  product.price = req.body.price;

  product.save(function (err, data) {
    if (err) {
      res.status(500).send({ error: "Could not find Saved Product" });
    } else {
      res.send(data);
    }
  });
});

router.get("/product", function (request, response) {
  Product.find({}, function (err, data) {
    if (err) {
      response.status(500).send({ err: "Could not get products" });
    } else {
      response.send(data);
    }
  });
});

module.exports = router;
