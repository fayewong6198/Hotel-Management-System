import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  DELETE_ROOM_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  CREATE_USER_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_SUCCESS
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_USERS_FAIL
    });
  }
};

export const createUser = (imageData, formData) => async dispatch => {
  const configJSON = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(formData);

  try {
    // Create User
    const res = await axios.post("/api/users", body, configJSON);

    dispatch(setAlert("Create User Success", "success"));

    console.log(imageData.avatar);

    // Upload Avatar
    if (imageData) {
      uploadAvatar(res.data.data._id, imageData);
    }
  } catch (error) {
    dispatch(setAlert("Create User Fail", "danger"));
  }
};

export const getUserById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    console.log("Get user by id ");
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL
    });
  }
};

// Update User
export const updateUser = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  gender,
  address,
  role
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address,
    role
  });

  try {
    const res = await axios.put(`/api/users/${id}`, body, config);

    dispatch(setAlert("Update User Success", "success"));

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert("Update User Fail", "danger"));
  }
};

// Delete User
export const deleteUserById = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/${id}`);

    dispatch(setAlert("Delete User Success", "success"));

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: res.data.data._id
    });
  } catch (error) {
    dispatch(setAlert("Delete User Fail", "danger"));

    dispatch({
      type: DELETE_USER_FAIL
    });
  }
};

// Upload Avatar
export const uploadAvatar = (id, imageData) => async dispatch => {
  const configFormData = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    const res = await axios.put(
      `/api/users/${id}/avatar`,
      imageData,
      configFormData
    );

    dispatch(setAlert("Upload Avatar Success", "success"));

    dispatch({
      type: UPDATE_USER_AVATAR_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert("Upload Avatar Fail", "danger"));
  }
};
