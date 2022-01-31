import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Fetch all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

//etch single Product
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

export { getProductByID, getProducts };
