import express from "express";
import {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminAccess, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, adminAccess, createProduct);

router
  .route("/:id")
  .get(getProductByID)
  .delete(protect, adminAccess, deleteProduct)
  .put(protect, adminAccess, updateProduct);

export default router;
