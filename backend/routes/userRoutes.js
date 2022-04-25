const express = require("express");
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);

router.post("/login", authUser);

//protect middleware runs when this route is entered
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
