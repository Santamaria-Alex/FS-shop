const express = require("express");
const {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;
