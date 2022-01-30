import React, { useEffect, useState } from "react";
import "../views/productScreen.css";
import { Link, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsAction } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";
const ProductScreen = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(productDetailsAction(params.id));
  }, [dispatch]);

  const handleAddtoCart = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  return (
    <div className="productScreen">
      <div className="productScreen__back">
        <Link to="/" className="productScreen__back__link">
          Go Back
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
      ) : (
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
            {product.countInStock > 0 && (
              <div className="productScreen__details__qty">
                <span>Qty : </span>
                <select
                  id="qty"
                  name="qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {product.countInStock > 0 ? (
              <div className="productScreen__details__price__details__cart">
                <button
                  className="productScreen__details__price__details__toCart"
                  onClick={handleAddtoCart}
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
