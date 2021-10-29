import * as constants from './constants';
import {FORGOT_PASSWORD} from '../../auth/redux/constants';

export const INITIAL_STATE = {
  settings: {
    autoLock: 'default',
    idleLockTime: 60,
    language: null,
  },
  error: null,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const {type, error, payload} = action;

  switch (type) {
    // GET_SETTINGS
    case constants.GET_SETTINGS.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_SETTINGS.SUCCESS:
      return {
        ...state,
        settings: payload,
      };
    case constants.GET_SETTINGS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_SETTINGS.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // UPDATE_SETTINGS
    case constants.UPDATE_SETTINGS.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.UPDATE_SETTINGS.SUCCESS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload,
        },
      };
    case constants.UPDATE_SETTINGS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.UPDATE_SETTINGS.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // FORGOT_PASSWORD
    case FORGOT_PASSWORD.SUCCESS:
      return state;

    default:
      return state;
  }
}
