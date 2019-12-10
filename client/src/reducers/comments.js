import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL
} from "../actions/types";

const initialState = {
  loading: true,
  comments: [],
  count: 0,
  pagination: null
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload.data,
        count: payload.count,
        pagination: payload.pagination,
        loading: false
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [payload.data, ...state.comments]
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter(
          comment => comment._id != payload.data._id
        )
      };
    case GET_COMMENTS_FAIL: {
      return {
        ...state,
        loading: true
      };
    }

    case DELETE_COMMENT_FAIL:
    case CREATE_COMMENT_FAIL:
    default:
      return state;
  }
}
