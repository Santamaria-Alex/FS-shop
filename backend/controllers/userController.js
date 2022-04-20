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

module.exports = { authUser };
