import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Fetch all Products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.count({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//fetch single Product
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
  console.log(req.body.countInstock);
  const user = req.user;
  try {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
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
      countInStock,
      numReviews,
      description,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400);
    throw new Error("Please enter all details");
  }
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
      throw new Error(
        "You have already reviewed or not provided proper review"
      );
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

//get top rated products
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProductByID,
  getProducts,
  deleteProduct,
  createProduct,
  createReview,
  getTopProducts,
};
