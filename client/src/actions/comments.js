import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getCommentsByRoomId = id => async dispatch => {
  try {
    const res = await axios.get(`/api/rooms/${id}/comments`);

    console.log(res.data);
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
    dispatch(setAlert("Can not get comments", "danger"));

    dispatch({
      type: GET_COMMENTS_FAIL,
      payload: error
    });
  }
};

export const createNewComment = (id, comment) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };

  const body = JSON.stringify(comment);

  try {
    const res = await axios.post(`/api/rooms/${id}/comments`, body, config);

    console.log("res", res.data);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: CREATE_COMMENT_FAIL
    });
  }
};

export const deleteComment = id => async dispatch => {
  try {
    console.log("id", id);
    const res = await axios.delete(`/api/comments/${id}/`);

    console.log("res", res.data);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
    dispatch(setAlert("Delete Comment Fail", "danger"));
    dispatch({
      type: DELETE_COMMENT_FAIL
    });
  }
};
