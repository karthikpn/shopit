import express from "express";

import {
  addOrderItems,
  getOrderByUser,
  getOrderByUserforAdmin,
} from "../controllers/orderController.js";
import { adminAccess, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, addOrderItems);

router.route("/").get(protect, getOrderByUser);
router.route("/:id").get(protect, adminAccess, getOrderByUserforAdmin);

export default router;
