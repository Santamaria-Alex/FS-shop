const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
//get all products from products.js
//async handler is middleware for handling exceptions
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); //by not passing in an arg. it will return everything in Product model

    res.json(products);
  })
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
//get single product based on id from products.js
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    //get product based on id that matches in URL
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  })
);

module.exports = router;
