import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";
//
export const loadUser = () => async dispatch => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const res = await axios.get("api/auth");
    console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({
  firstName,
  lastName,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ firstName, lastName, email, password });

  let res;

  try {
    res = await axios.post("api/auth/register", body, config);
    console.log("REGISTER CONCAC");
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    dispatch(setAlert("Register succeseful", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error);
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg), "danger"));
    }
    dispatch(setAlert("Register failed", "danger"));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  let res;

  try {
    res = await axios.post("api/auth/login", body, config);
    console.log("DIT ME MAY");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    dispatch(setAlert("Login succeseful", "success"));
  } catch (error) {
    dispatch(setAlert("Login failed", "danger"));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOG_OUT });
};
