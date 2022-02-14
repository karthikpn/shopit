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

  console.log(rating);

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch(createProductReviewResetAction());
    }
    if (errorProductReview) {
      alert("Product already reviewd or proper review details not filled");
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
    <>
      <div className="productScreen md:hidden lg:hidden xl:hidden">
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
          <div className="lg m-4  lg:hidden xl:hidden">
            <img
              src={product.image}
              alt={product.name}
              className="productScreen__details__image sm:w-full"
            />
            <div className="productScreen__details__subDetails mt-4 w-full text-center">
              <h2>{product.name}</h2>
              <div className="productScreen__details__subDetails__rating">
                <Rating rating={product.rating} /> of {product.numReviews}{" "}
                Reviews
              </div>
              <div className="productScreen__details__subDetails__desc">
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>
            </div>
            {userInfo && (
              <>
                <div className=" mt-4 flex flex-col items-center ">
                  <h5 style={{ margin: "1rem" }}>Add review</h5>
                  {errorProductReview && (
                    <Message message={errorProductReview} />
                  )}
                  {successProductReview && (
                    <Message messaeg="Successfully added review" />
                  )}

                  <div className="flex w-3/4 justify-around">
                    <span>Rating : </span>
                    <select
                      className="w-1/2 border-2 border-gray-200 py-1"
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <div className="my-4 flex w-3/4 justify-around">
                    <span>Comment:</span>
                    <input
                      type="text"
                      label="comment"
                      value={comment}
                      className="w-1/2 border-2 border-gray-200 py-1"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button
                    className="my-4 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                    onClick={addReview}
                    style={{ width: "fit-content" }}
                  >
                    Add review
                  </button>
                </div>
              </>
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
                <button
                  className="my-4 w-fit rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                  onClick={handleAddtoCart}
                >
                  Add to Cart
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        <div>
          {!loading && (
            <h2 className="my-4 flex justify-center text-xl">Reviews</h2>
          )}
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
      {/* mobile view */}
      <div className="productScreen sm:hidden">
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
          <div className="lg flex justify-around border-b-2 border-b-gray-100 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="productScreen__details__image min-w-max sm:w-full"
            />
            <div className="productScreen__details__subDetails mt-4">
              <h2>{product.name}</h2>

              <div className="productScreen__details__subDetails__desc">
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>
            </div>

            <div className="min-w-fit">
              <div className="productScreen__details__price__details">
                <span>Price</span>
                <span>${product.price}</span>
              </div>
              <div className="productScreen__details__price__details__status">
                <span className="w-fit">
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
                <button
                  className="my-4 w-fit rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                  onClick={handleAddtoCart}
                >
                  Add to Cart
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        <div>
          {!loading && (
            <div className="w-full">
              <div className="flex items-center justify-center py-4">
                {" "}
                <Rating rating={product.rating} /> of {product.numReviews}{" "}
                Reviews
              </div>
              {userInfo && (
                <>
                  <div className="productScreen__details__subDetails mt-4 flex flex-col items-center border-t-2 border-solid border-gray-100">
                    <h5 style={{ margin: "1rem" }}>Add review</h5>
                    {errorProductReview && (
                      <Message message={errorProductReview} />
                    )}
                    {successProductReview && (
                      <Message messaeg="Successfully added review" />
                    )}

                    <div className="flex w-3/4 justify-around">
                      <span>Rating : </span>
                      <select
                        className="w-1/2 border-2 border-gray-200 py-1"
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                    <div className="my-4 flex w-3/4 justify-around">
                      <span>Comment:</span>
                      <input
                        type="text"
                        label="comment"
                        value={comment}
                        className="w-1/2 border-2 border-gray-200 py-1"
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <button
                      className="my-4 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                      onClick={addReview}
                      style={{ width: "fit-content" }}
                    >
                      Add review
                    </button>
                    <h2 className="my-4 text-xl">Reviews</h2>
                  </div>
                </>
              )}
            </div>
          )}
          {product.reviews?.length === 0 ? (
            <Message message="No reviews yet!" color="green" />
          ) : (
            <>
              {product.reviews?.map((review) => (
                <div className="mx-10 flex flex-col  p-4">
                  <span>
                    <Rating rating={review.rating} />
                  </span>
                  <span>{review.comment}</span>
                  <span>{review.name}</span>
                  <span className="text-zinc-400">
                    {review.createdAt.substring(0, 10)}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
