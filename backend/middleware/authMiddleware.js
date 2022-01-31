import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized!");
  }
});
export { protect };
