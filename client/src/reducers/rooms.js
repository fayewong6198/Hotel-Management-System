import { SEARCH_ROOM_SUCCESS, DELETE_ROOM_SUCCESS } from "../actions/types";

const initialState = {
  loading: true,
  count: 0,
  pagination: null,
  rooms: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: state.rooms.filter(room => room._id != payload),
        count: state.count - 1
      };
    case SEARCH_ROOM_SUCCESS:
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
