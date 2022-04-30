const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
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

/////////////////////////////////////////////////////////////////

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
//async handler is middleware for handling exceptions
const getOrderById = asyncHandler(async (req, res) => {
  //fetch order
  //get id from URL, hence .params
  //Populate will automatically replace the specified path in the document, with document(s) from other collection(s).
  //turns this => "user": "6244b84a0c6266631f87604b",
  //into this =>
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

module.exports = { addOrderItems, getOrderById };
