import * as constants from './constants';

export const INITIAL_STATE = {
  authenticated: false,
  password: null,
  error: null,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const {type, error, payload} = action;

  switch (type) {
    // GET_PASSWORD
    case constants.GET_PASSWORD.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_PASSWORD.SUCCESS:
      return {
        ...state,
        password: payload,
      };
    case constants.GET_PASSWORD.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_PASSWORD.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // CREATE PASSWORD
    case constants.CREATE_PASSWORD.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.CREATE_PASSWORD.SUCCESS:
      return {
        ...state,
        authenticated: true,
        password: payload,
      };
    case constants.CREATE_PASSWORD.FAIL:
      return {
        ...state,
        error,
      };
    case constants.CREATE_PASSWORD.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // FORGOT PASSWORD
    case constants.FORGOT_PASSWORD.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.FORGOT_PASSWORD.SUCCESS:
      return INITIAL_STATE;
    case constants.FORGOT_PASSWORD.FAIL:
      return {
        ...state,
        error,
      };
    case constants.FORGOT_PASSWORD.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // CHANGE PASSWORD
    case constants.CHANGE_PASSWORD.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        password: payload,
        authenticated: false,
      };
    case constants.CHANGE_PASSWORD.FAIL:
      return {
        ...state,
        error,
      };
    case constants.CHANGE_PASSWORD.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // LOGIN
    case constants.LOGIN:
      return {
        ...state,
        authenticated: true,
      };

    // LOGOUT
    case constants.LOGOUT:
      return {
        ...state,
        authenticated: false,
      };

    default:
      return state;
  }
}
