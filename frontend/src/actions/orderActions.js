import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    //send request
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    //destructure userInfo from userLogin, which is destructured from getState function
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //update data from backend
    const { data } = await axios.post(`/api/orders`, order, config);

    //send data
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    //send request
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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

    //get data from backend that matches id passed in as parameter
    const { data } = await axios.get(`/api/orders/${id}`, config);

    //send data
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
