import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_AVATAR_SUCCESS
} from "../actions/types";

const initialState = {
  loading: true,
  profile: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload
      };
    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          avatar: payload
        }
      };
    case UPDATE_PROFILE_FAIL:
    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
