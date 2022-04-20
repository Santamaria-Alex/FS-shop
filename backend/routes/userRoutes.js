const express = require("express");
const {
  authUser,
  registerUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", authUser);

router.route("/").post(registerUser);

//protect middleware runs when this route is entered
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
