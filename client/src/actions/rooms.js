import { SEARCH_ROOM_SUCCESS, DELETE_ROOM_SUCCESS } from "./types";
import { setAlert } from "../actions/alert";
import axios from "axios";

export const searchRooms = data => async dispatch => {
  let res;
  let params = {};

  params["numberOfAdults[gte]"] = (data && data.get("numberOfAdults")) || 1;
  params["numberOfChildren[gte]"] = (data && data.get("numberOfChildren")) || 1;
  params["checkInDate"] = (data && data.get("checkInDate")) || "";
  params["checkOutDate"] = (data && data.get("checkOutDate")) || "";
  params["type"] = data && data.get("type");

  try {
    res = await axios.get("api/rooms", {
      params
    });

    dispatch({
      type: SEARCH_ROOM_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete Room
export const deleteRoomById = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/rooms/${id}`);

    dispatch(setAlert("Delete Room Success", "success"));
    console.log("res: ", res.data.data._id);

    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: res.data.data._id
    });
  } catch (error) {
    dispatch(setAlert("Delete Room Fail", "danger"));
  }
};
