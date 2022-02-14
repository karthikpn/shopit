import express from "express";

import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

dotenv.config();
connectDB();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend/public/images")));

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, "/frontend/build/")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${process.env.PORT}`
      .green.bold
  );
});

app.use(notFound);
app.use(errorHandler);
