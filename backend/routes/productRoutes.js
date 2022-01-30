import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
const router = express.Router();

// @desc : Fetch all Products
// @route : GET /api/products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.send(products);
  })
);

// @desc : Fetch single Product
// @route : GET /api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      throw new Error("Product Not found");
    }
  })
);

export default router;
