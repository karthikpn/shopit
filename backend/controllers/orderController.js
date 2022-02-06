import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//create new order
export const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, itemsPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order items");
  } else {
    const order = new Order({
      orderItems,
      itemsPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//get new order
export const getOrderByUser = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );
  if (order) {
    console.log(order);
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
export const getOrderByUserforAdmin = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const order = await Order.find({ user: req.params.id }).populate(
    "user",
    "name email"
  );
  if (order) {
    console.log(order);
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
