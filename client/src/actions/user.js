import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_AVATAR_SUCCESS
} from "./types";

export const getCurrentProfile = () => async dispatch => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  let res;

  try {
    res = await axios.get("/api/auth");

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data
    });

    console.log("profile: ", res.data);
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_PROFILE_FAIL
    });
  }
};

export const updateProfile = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  gender,
  address
}) => async dispatch => {
  console.log("GO IN TO UPDATE");

  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log("gender: ", phoneNumber);
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address
  });

  let res;

  try {
    res = await axios.put("/api/auth", body, config);

    dispatch(setAlert("Update Profile Success", "success"));
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert("Update Profile Fail, Please Try Again", "danger"));
    dispatch({
      type: UPDATE_PROFILE_FAIL
    });
  }
};

// Upload Avatar
export const uploadAvatar = imageData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    const res = await axios.put(`/api/auth/avatar`, imageData, config);

    dispatch({
      type: UPDATE_AVATAR_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert("Upload Avatar Success", "success"));
  } catch (error) {
    console.error(error);
    dispatch(setAlert("Upload Avatar Fail", "danger"));
  }
};
