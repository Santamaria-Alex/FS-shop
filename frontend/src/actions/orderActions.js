import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
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

/////////////////////////////////////////////////////////////////

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      //send request
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      //destructure userInfo from userLogin, which is destructured from getState function
      const {
        userLogin: { userInfo },
      } = getState();

      //pass in token into headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //update payment data from backend that matches id
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      //send data
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

/////////////////////////////////////////////////////////////////

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    //send request
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
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

    //get data from backend
    const { data } = await axios.get(`/api/orders/myorders`, config);

    //send data
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const listOrders = () => async (dispatch, getState) => {
  try {
    //send request
    dispatch({
      type: ORDER_LIST_REQUEST,
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

    //get data from backend
    const { data } = await axios.get(`/api/orders`, config);

    //send data
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
