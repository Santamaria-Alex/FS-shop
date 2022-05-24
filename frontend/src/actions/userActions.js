import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

/////////////////////////////////////////////////////////////////

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //get data from backend
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    //send data
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    //set data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });

  //fix bug where previous logged in users orders show on newly logged in users profile
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

/////////////////////////////////////////////////////////////////

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //post data to backend
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    //send data
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    //the user gets automatically signed in when they register
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    //set data to local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    //get data from backend
    const { data } = await axios.get(`/api/users/${id}`, config);

    //send data
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    //get data from backend
    const { data } = await axios.put(`/api/users/profile`, user, config);

    //send data
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    //destructure userInfo from userLogin, which is destructured from getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //get token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //get data from backend
    const { data } = await axios.get(`/api/users`, config);

    //send data
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    //destructure userInfo from userLogin, which is destructured from getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //get token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //delete data from backend
    await axios.delete(`/api/users/${id}`, config);

    //send data
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////////////////////////////////////////////

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    //destructure userInfo from userLogin, which is destructured from getState function
    const {
      userLogin: { userInfo },
    } = getState();

    //get token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //update data from backend
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    //send data
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    //sending data to the state
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
