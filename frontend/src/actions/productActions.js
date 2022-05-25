import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
} from "../constants/productConstants";

//these funcs are action-creators
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    //get data from products.js in backend
    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//4th part, where we actually send request
//this is where we make request to backend
export const listProductDetails = (id) => async (dispatch) => {
  try {
    //dispatch === send?
    //this will set loading to true
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    //get data from products.js in backend
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    //send request
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    //destructure userInfo from userLogin, which is destructured from getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //pass in token into headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //delete data from backend
    await axios.delete(`/api/products/${id}`, config);

    //send data
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const createProduct = () => async (dispatch, getState) => {
  try {
    //send request
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    //destructure userInfo from userLogin, which is destructured from getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //pass in token into headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //delete data from backend
    //2nd arg is an empty {} bc we're not sending any data
    const { data } = await axios.post(`/api/products`, {}, config);

    //send data
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
