const express = require("express");
const { authUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", authUser);

//protect middleware runs when this route is entered
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
