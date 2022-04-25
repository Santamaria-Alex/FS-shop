import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

//3rd part, bring in reducer to store
//this is the state, can view in Redux Devtool
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

//if theres a 'cartItems' in localStorage then we get the data and parse it bc its a string
//if there isnt then set an empty array
// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

//above equation didn't work for undefined local storage bc u can't parse undefined
const lsTrue = localStorage.getItem("cartItems");

const lsUndefined = localStorage.getItem("cartItems") !== "undefined";

const cartItemsFromStorage =
  lsTrue && lsUndefined ? JSON.parse(localStorage.getItem("cartItems")) : [];

//get user info from local storage
//have to check if undefined first
const userlsTrue = localStorage.getItem("userInfo");

const userlsUndefined = localStorage.getItem("userInfo") !== "undefined";

const userInfoFromStorage =
  userlsTrue && userlsUndefined
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
