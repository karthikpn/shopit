import express from "express";
import {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  createReview,
  getTopProducts,
} from "../controllers/productController.js";
import { adminAccess, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, adminAccess, createProduct);
router.route("/:id/review").post(protect, createReview);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductByID)
  .delete(protect, adminAccess, deleteProduct);

export default router;
