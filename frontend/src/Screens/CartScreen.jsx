import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addToCartAction } from "../actions/cartActions";

const CartScreen = () => {
  const params = useParams();
  let location = useLocation();
  const dispatch = useDispatch();

  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCartAction(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <div>
      <h2>sah</h2>
    </div>
  );
};

export default CartScreen;
