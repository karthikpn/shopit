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

//create new review
const createReview = asyncHandler(async (req, res) => {
  const user = req.user;
  const { rating, comment } = req.body;
  const products = await Product.findById(req.params.id);
  if (products) {
    const alreadyReviewed = products.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    products.reviews.push(review);
    products.numReviews = products.reviews.length;
    products.rating =
      products.reviews.reduce((acc, item) => item.rating + acc, 0) /
      products.reviews.length;
    await products.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(400);
    throw new Error("Product not found");
  }
});

export {
  getProductByID,
  getProducts,
  deleteProduct,
  createProduct,
  createReview,
};
