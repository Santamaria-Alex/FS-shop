const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public

//async handler is middleware for handling exceptions
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //finding a document that matches the email from the req.body from the User model
  const user = await User.findOne({ email });

  //check to see if there is a user with entered email
  //check to see if passwords match with said user
  //using bcrypt for PW that is in userModel
  //the token is so we can access protected routes
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); //not authorized
    throw new Error("Invalid email or password");
  }
});

//////////////////////////////////////////////////////////////

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

//async handler is middleware for handling exceptions
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //finding a document that matches the email from the req.body from the User model
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); //bad request
    throw new Error("User already exists");
  }

  //create user using method from User model
  const user = await User.create({
    name,
    email,
    password, //this PW will be encrypted by the middlware in userModel
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//////////////////////////////////////////////////////////////

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

//async handler is middleware for handling exceptions
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//////////////////////////////////////////////////////////////

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

//async handler is middleware for handling exceptions
const updateUserProfile = asyncHandler(async (req, res) => {
  //get the logged in user
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      //PW will be encrypted automatically even if it's changed
      //Middleware will be called that we added in the user Model
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    //send the updated data
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { authUser, registerUser, getUserProfile };
