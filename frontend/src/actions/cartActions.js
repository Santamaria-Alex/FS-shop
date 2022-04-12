import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    //payload is the data we send
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  //have to stringify bc we can only store strings in local storage
  //have to use JSON.parse to extract it
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
