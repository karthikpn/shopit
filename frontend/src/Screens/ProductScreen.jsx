import React, { useEffect, useState } from "react";
import "../views/productScreen.css";
import { Link, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReviewAction,
  createProductReviewResetAction,
  productDetailsAction,
} from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductScreen = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const productReviewCreate = useSelector((state) => state.productReviewCreate);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;
  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch(createProductReviewResetAction());
    }
    if (errorProductReview) {
      alert("Product already reviewd");
      setRating(0);
      setComment("");
      dispatch(createProductReviewResetAction());
    }
    dispatch(productDetailsAction(params.id));
  }, [dispatch, successProductReview, errorProductReview]);

  const addReview = async (e) => {
    dispatch(createProductReviewAction(params.id, { rating, comment }));
  };
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
        <Message message={error} />
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
          {userInfo && (
            <div
              className="productScreen__details__subDetails"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h5 style={{ margin: "1rem" }}>Add review</h5>
              {errorProductReview && <Message message={errorProductReview} />}
              {successProductReview && (
                <Message messaeg="Successfully added review" />
              )}

              <>
                <span>Rating : </span>
                <input
                  type="number"
                  value={rating}
                  min="0"
                  label="Rating"
                  max="5"
                  style={{ padding: "1rem 1rem", width: "70%", margin: "1rem" }}
                  onChange={(e) => setRating(e.target.value)}
                />
              </>
              <>
                <span>Comment</span>
                <input
                  type="text"
                  label="comment"
                  value={comment}
                  style={{
                    padding: "1rem 1rem",
                    width: "70%",
                    margin: "1rem",
                    display: "inline-block",
                  }}
                  onChange={(e) => setComment(e.target.value)}
                />
              </>
              <div className="productScreen__details__price__details__cart">
                <button
                  className="productScreen__details__price__details__toCart"
                  onClick={addReview}
                >
                  Add review
                </button>
              </div>
            </div>
          )}
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
      <div>
        <h2>Reviews</h2>
        {product.reviews?.length === 0 ? (
          <Message message="No reviews yet!" color="green" />
        ) : (
          <>
            {product.reviews?.map((review) => (
              <>
                <span>{review.name}</span>
                <span>
                  <Rating rating={review.rating} />
                </span>
                <span>{review.createdAt.substring(0, 10)}</span>
                <span>{review.comment}</span>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
