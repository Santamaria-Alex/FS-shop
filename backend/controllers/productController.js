const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
//get all products from products.js
//async handler is middleware for handling exceptions
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumer) || 1;

  const search = req.query.search;

  const searching = search
    ? // const keyword = req.query.keyword
      {
        name: {
          $regex: search, //regex allows search result to show up even if it's not all typed out
          $options: "i",
        },
      }
    : {};

  const count = await Product.count({ ...searching });
  const products = await Product.find({ ...searching })
    .limit(pageSize)
    .skip(pageSize * (page - 1)); //by not passing in an arg. it will return everything in Product model

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
//get single product based on id from products.js
const getProductById = asyncHandler(async (req, res) => {
  //get product based on id that matches in URL
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
//get single product based on id from products.js
const deleteProduct = asyncHandler(async (req, res) => {
  //get product based on id that matches in URL
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed." });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
//get single product based on id from products.js
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
//get single product based on id from products.js
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  //find product by id which is in URL
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed!");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    //add review to product review schema
    product.reviews.push(review);

    //total number of reviews
    product.numReviews = product.reviews.length;

    //avg rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// export { getProducts, getProductById };
module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
