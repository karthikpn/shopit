import React, { useEffect, useState } from "react";
import "../views/productScreen.css";
import { Link, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState({});

  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${params.id}`);
      console.log(data);
      setProduct(data);
    };
    fetchProduct();
  }, []);

  const handleAddtoCart = () => {
    console.log("clicked");
  };

  return (
    <div className="productScreen">
      <div className="productScreen__back">
        <Link to="/" className="productScreen__back__link">
          Go Back
        </Link>
      </div>
      <div className="productScreen__details">
        <img
          src={product.image}
          alt={product.name}
          className="productScreen__details__image"
        />
        <div className="productScreen__details__subDetails">
          <h2>{product.name}</h2>
          <div className="productScreen__details__subDetails__rating">
            <Rating rating={product.rating} /> of {product.numReviews} Reviews
          </div>
          <div className="productScreen__details__subDetails__desc">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="productScreen__details__price">
          <div className="productScreen__details__price__details">
            <span>Price</span>
            <span>${product.price}</span>
          </div>
          <div className="productScreen__details__price__details__status">
            <span>Status :</span>
            <span>
              {product.countInStock > 0 ? (
                <span>{product.countInStock} stocks available</span>
              ) : (
                <span>Out of Stock</span>
              )}
            </span>
          </div>
          {product.countInStock > 0 ? (
            <div className="productScreen__details__price__details__cart">
              <button
                className="productScreen__details__price__details__toCart"
                onClick={handleAddtoCart()}
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;