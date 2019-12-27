import {
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENT_SUCCESS,
  GET_PAYMEMTS_FAIL,
  GET_PAYMEMT_FAIL
} from "../actions/types";

const initialState = {
  payments: null,
  payment: null,
  loading: true
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: payload.data,
        loading: false
      };
    case GET_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: payload.data,
        loading: false
      };
    case GET_PAYMEMTS_FAIL:
    case GET_PAYMEMT_FAIL:
    default:
      return {
        ...state
      };
  }
}
