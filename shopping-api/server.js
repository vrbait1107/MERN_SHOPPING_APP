const express = require("express");
const App = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = mongoose.connect("mongodb://localhost/shopping-api", {
  useNewUrlParser: true,
});

// Cross Origin Issue
App.use(cors());
//importing database model from model folder
const Product = require("./model/Product");
const Wishlist = require("./model/Wishlist");

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.post("/product", function (req, res) {
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

App.get("/product", function (request, response) {
  Product.find({}, function (err, data) {
    if (err) {
      response.status(500).send({ err: "Could not get products" });
    } else {
      response.send(data);
    }
  });
});

App.post("/wishlist", function (request, response) {
  let wishlist = new Wishlist();
  wishlist.title = request.body.title;

  wishlist.save(function (err, data) {
    if (err) {
      response.status(500).send({ error: "Could not create Wishlist" });
    } else {
      response.send(data);
    }
  });
});

App.get("/wishlist", function (request, response) {
  Wishlist.find({})
    .populate({ path: "products", model: "Product" })
    .exec(function (err, wishlistData) {
      if (err) {
        response.status(500).send({ error: "Could not get Wishlist" });
      } else {
        response.status(200).send(wishlistData);
      }
    });
});

//Adding Product in Wishlist
App.put("/wishlist/product/add", function (request, response) {
  Product.findOne({ _id: request.body.productId }, function (err, productData) {
    if (err) {
      response.status(500).send({ error: "Could not add product in wishlist" });
    } else {
      Wishlist.update(
        { _id: request.body.wishlistId },
        {
          $addToSet: {
            products: productData._id,
          },
        },
        function (err, wishlistData) {
          if (err) {
            response
              .status(500)
              .send({ error: "Could not add product in wishlist" });
          } else {
            response.send("Successfully added to Wishlist");
          }
        }
      );
    }
  });
});

App.listen(5000, function () {
  console.log("Server listening at port 5000");
});
