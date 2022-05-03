const express = require("express");
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/login", authUser);

//protect middleware runs when this route is entered
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//delete user
router.route("/:id").delete(protect, admin, deleteUser);

module.exports = router;
