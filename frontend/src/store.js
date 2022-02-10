import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createProductReviewReducer,
  createProductsReducer,
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import { orderCreateReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  userList: userListReducer,
  createProduct: createProductsReducer,
  productReviewCreate: createProductReviewReducer,
});

const middleware = [thunk];
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsPriceFromStorage = localStorage.getItem("itemsPrice")
  ? JSON.parse(localStorage.getItem("itemsPrice"))
  : 0;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    itemsPrice: cartItemsPriceFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
