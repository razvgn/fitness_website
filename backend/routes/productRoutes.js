import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  filterProducts,
} from "../controllers/productController.js";

import {
  authentication,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authentication, authorizedAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authentication, checkId, addProductReview);

router.get("/top", fetchTopProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authentication, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authentication, authorizedAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
