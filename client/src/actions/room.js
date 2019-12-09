import {
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPLOAD_ROOM_IMAGE_SUCCESS,
  UPDATE_ROOM_SUCCESS
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getRoomById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/rooms/${id}`);

    dispatch({
      type: GET_ROOM_SUCCESS,
      payload: res.data
    });

    console.log("Data", res.data.data);
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_ROOM_FAIL
    });
  }
};

// Create Room
export const createRoom = (imageData, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/rooms", body, config);

    dispatch(setAlert("Create Room Success", "success"));

    console.log(imageData);

    if (imageData) {
      const configFormData = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      try {
        const resImage = await axios.put(
          `/api/rooms/${res.data.data._id}/image`,
          imageData,
          configFormData
        );

        console.log("fhhfhgfhfh");
        dispatch(setAlert("Upload Room Image Success", "success"));
      } catch (error) {
        dispatch(setAlert("Upload Room Image Fail", "danger"));
      }
    }
  } catch (error) {
    dispatch(setAlert("Create Room Fail", "danger"));
  }
};

// Update Room
export const updateRoom = ({
  id,
  roomId,
  type,
  price,
  numberOfAdults,
  numberOfChildren,
  description
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    type,
    roomId,
    price,
    numberOfAdults,
    numberOfChildren,
    description
  });

  try {
    const res = await axios.put(`/api/rooms/${id}`, body, config);

    dispatch(setAlert("Update Room Success", "success"));
    dispatch({
      type: UPDATE_ROOM_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert("Update Room Fail", "danger"));
  }
};

export const updateRoomImage = (id, imageData) => async dispatch => {
  const configFormData = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    const res = await axios.put(
      `/api/rooms/${id}/image`,
      imageData,
      configFormData
    );

    dispatch(setAlert("Upload Room Image Success", "success"));

    dispatch({
      type: UPLOAD_ROOM_IMAGE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch(setAlert("Upload Room Image Fail", "danger"));
  }
};
