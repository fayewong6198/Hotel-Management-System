import { SET_DATE_SUCCESS, SET_DATE_FAILED } from "../actions/types";

const initialState = {
  checkInDate: null,
  checkOutDate: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DATE_SUCCESS:
      return {
        ...state,
        checkInDate: payload.checkInDate,
        checkOutDate: payload.checkOutDate
      };
    case SET_DATE_FAILED: {
      return {
        ...state,
        checkInDate: null,
        checkOutDate: null
      };
    }
    default:
      return state;
  }
}
