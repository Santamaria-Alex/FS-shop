const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
//get all products from products.js
//async handler is middleware for handling exceptions
const addOrderItems = asyncHandler(async (req, res) => {
  //get from order model/schema
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //check that orderItems isn't empty
  if (orderItems && orderItems.length === 0) {
    res.status(400); //bad request
    throw new Error("No order items.");
  } else {
    //instantiate new order
    const order = new Order({
      orderItems,
      user: req.user._id, //attach logged in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    //save to database
    const createdOrder = await order.save();

    //201: something was created
    res.status(201).json(createdOrder);
  }
});

module.exports = { addOrderItems };
