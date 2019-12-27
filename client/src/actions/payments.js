import {
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENT_SUCCESS,
  GET_PAYMEMTS_FAIL,
  GET_PAYMEMT_FAIL
} from "../actions/types";

import { setAlert } from "./alert";
import axios from "axios";

export const getPayments = () => async dispatch => {
  try {
    const res = await axios.get(`/api/payments`);
    console.log(res.data);
    dispatch({
      type: GET_PAYMENTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMEMTS_FAIL
    });
  }
};

export const getUserPayments = () => async dispatch => {
  try {
    const res = await axios.get(`/api/payments/user`);
    console.log(res.data);
    dispatch({
      type: GET_PAYMENTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMEMTS_FAIL
    });
  }
};

export const getPayment = () => async dispatch => {
  try {
    const res = axios.get(`/api/payment`);

    dispatch({
      type: GET_PAYMENT_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMEMT_FAIL
    });
  }
};
