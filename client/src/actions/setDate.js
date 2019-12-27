import { SET_DATE_SUCCESS, SET_DATE_FAILED } from "./types";

export const setDate = (checkInDate, checkOutDate) => async dispatch => {
  dispatch({
    type: SET_DATE_SUCCESS,
    payload: { checkInDate, checkOutDate }
  });
};
