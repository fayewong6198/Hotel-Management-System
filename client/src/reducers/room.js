import {
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  UPLOAD_ROOM_IMAGE_SUCCESS,
  UPLOAD_ROOM_IMAGE_FAIL
} from "../actions/types";

const initialState = {
  loading: true,
  roomData: null
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case GET_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        roomData: payload.data
      };
    case UPLOAD_ROOM_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        roomData: {
          ...state.roomData,
          image: payload.data
        }
      };
    case GET_ROOM_FAIL:
      return {
        ...state,
        loading: true,
        roomData: null
      };
    default:
      return {
        ...state,
        loading: true,
        roomData: null
      };
  }
}
