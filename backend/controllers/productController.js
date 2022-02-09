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

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

//create a product
const createProduct = asyncHandler(async (req, res) => {
  const user = req.user;
  const {
    name,
    price,
    image,
    brand,
    category,
    countInstock,
    numReviews,
    description,
  } = req.body;
  const product = new Product({
    name,
    price,
    user,
    image,
    brand,
    category,
    countInstock,
    numReviews,
    description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getProductByID, getProducts, deleteProduct, createProduct };
