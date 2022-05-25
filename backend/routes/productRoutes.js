const express = require("express");
const {
  getProductById,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

module.exports = router;
