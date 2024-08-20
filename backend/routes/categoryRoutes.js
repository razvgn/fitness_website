import express from "express";
import {
  authentication,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authentication, authorizedAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authentication, authorizedAdmin, updateCategory);

router
  .route("/:categoryId")
  .delete(authentication, authorizedAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
