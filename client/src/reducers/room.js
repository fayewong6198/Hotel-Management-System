import { SEARCH_ROOM_SUCCESS } from "../actions/types";

const initialState = {
  loading: true,
  count: null,
  pagination: null,
  rooms: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_ROOM_SUCCESS:
      console.log(payload);
      return {
        ...state,
        loading: false,
        rooms: payload.data,
        count: payload.count
      };
    default:
      return state;
  }
}
