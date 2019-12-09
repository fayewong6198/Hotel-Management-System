import {
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_FAIL
} from "../actions/types";

const initialState = {
  userLoading: true,
  loading: true,
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userLoading: true,
        users: payload.data,
        user: null
      };
    case UPDATE_USER_SUCCESS:
    case GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        loading: true,
        user: payload.data
      };
    case UPDATE_USER_FAIL:
    case GET_USERS_FAIL:
    case GET_USER_FAIL:
      return {
        ...state,
        loading: true,
        userLoading: true
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user._id != payload)
      };
    case UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload
        }
      };
    case UPDATE_USER_AVATAR_FAIL:
    case DELETE_USER_FAIL:
    default:
      return state;
  }
}
