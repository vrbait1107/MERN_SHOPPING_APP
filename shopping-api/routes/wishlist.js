const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const Wishlist = require("../model/Wishlist");

router.post("/wishlist", function (request, response) {
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

router.get("/wishlist", function (request, response) {
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
router.put("/wishlist/product/add", function (request, response) {
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

module.exports = router;
