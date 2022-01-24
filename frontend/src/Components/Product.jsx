import React from "react";
import { Link } from "react-router-dom";
import "../views/product.css";

const Product = ({ product }) => {
  return (
    <div className="product__item">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt="" className="product__item__image" />
      </Link>
      <h4 className="product__item__title">{product.name}</h4>
      <div className="product__item__details">
        <i>
          {product.rating} out of {product.numReviews} review
        </i>
        <h4>${product.price}</h4>
      </div>
    </div>
  );
};

export default Product;
