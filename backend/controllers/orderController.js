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
  //into this => "user": {
  // "_id": "6244b84a0c6266631f87604b",
  // "name": "John Do",
  // "email": "john@example.com" }
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

/////////////////////////////////////////////////////////////////

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
//async handler is middleware for handling exceptions
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //fetch order
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    //this comes from paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    //save the order to the database
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

/////////////////////////////////////////////////////////////////

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
//async handler is middleware for handling exceptions
const getMyOrders = asyncHandler(async (req, res) => {
  //get user get logged in user that matches id
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

/////////////////////////////////////////////////////////////////

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
//async handler is middleware for handling exceptions
const getOrders = asyncHandler(async (req, res) => {
  //find all orders, but only id and name from user
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});

/////////////////////////////////////////////////////////////////

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
//async handler is middleware for handling exceptions
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  //fetch order
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    //save the order to the database
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
