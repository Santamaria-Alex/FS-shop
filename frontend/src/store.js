import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

//3rd part, bring in reducer to store
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

//if theres a 'cartItems' in localStorage then we get the data and parse it bc its a string
//if there isnt then set an empty array
const cartItemsFromStorage = localStorage.getItem("cartItems") && if (localStorage.getItem("cartItems") !== 'undefined') {
  JSON.parse(localStorage.getItem("cartItems"))
} else [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
