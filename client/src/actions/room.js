import { SEARCH_ROOM_SUCCESS } from "./types";
import axios from "axios";

export const searchRooms = data => async dispatch => {
  let res;
  let params = {};

  console.log("hihi", data.get("numberOfAdults"));
  params["numberOfAdults[gte]"] = data.get("numberOfAdults") || 1;
  params["numberOfChildren[gte]"] = data.get("numberOfChildren") || 1;

  try {
    res = await axios.get("api/rooms", {
      params
    });

    console.log(params);
    dispatch({
      type: SEARCH_ROOM_SUCCESS,
      payload: res.data
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
