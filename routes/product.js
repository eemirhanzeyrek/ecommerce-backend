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

const router = express.Router();

router.get("/products", allProducts);
router.get("/admin/products", adminProducts);
router.get("/products/:id", detailProducts);
router.post("/product/new", createProduct);
router.post("/product/newReview", createReview);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

module.exports = router;
