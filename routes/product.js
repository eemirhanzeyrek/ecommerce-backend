const express = require("express");
const {
  allProducts,
  detailProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  adminProducts,
} = require("../controllers/product");
const { authMidd, roleChecked } = require("../middleware/auth");

const router = express.Router();

router.get("/products", allProducts);
router.get("/admin/products", authMidd, roleChecked("admin"), adminProducts);
router.get("/products/:id", detailProducts);
router.post("/product/new", authMidd, roleChecked("admin"), createProduct);
router.post("/product/newReview", authMidd, createReview);
router.delete("/products/:id", authMidd, roleChecked("admin"), deleteProduct);
router.put("/products/:id", authMidd, roleChecked("admin"), updateProduct);

module.exports = router;
