import React from "react";
import { Link } from "react-router-dom";
import "../views/product.css";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="product__item">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt="" className="product__item__image" />
      </Link>
      <h4 className="product__item__title">{product.name}</h4>
      <div className="product__item__details">
        <i>
          <Rating rating={product.rating} color="#152238" />
        </i>
        <h4>${product.price}</h4>
      </div>
    </div>
  );
};

export default Product;
