import * as constants from './constants';
import {FORGOT_PASSWORD} from '../../auth/redux/constants';

const DEFAULT_BANK = 'https://bank.keysign.app';

export const INITIAL_STATE = {
  banks: [DEFAULT_BANK],
  config: {},
  active: DEFAULT_BANK,
  error: null,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const {type, error, payload} = action;

  switch (type) {
    // GET_BANKS
    case constants.GET_BANKS.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_BANKS.SUCCESS:
      return {
        ...state,
        banks: payload.banks,
        active: payload.active,
      };
    case constants.GET_BANKS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_BANKS.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // CREATE_BANK
    case constants.CREATE_BANK.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.CREATE_BANK.SUCCESS:
      return {
        ...state,
        banks: [...state.banks, payload],
      };
    case constants.CREATE_BANK.FAIL:
      return {
        ...state,
        error,
      };
    case constants.CREATE_BANK.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // DELETE_BANK
    case constants.DELETE_BANK.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.DELETE_BANK.SUCCESS:
      return {
        ...state,
        banks: state.banks.filter(item => item !== payload),
      };
    case constants.DELETE_BANK.FAIL:
      return {
        ...state,
        error,
      };
    case constants.DELETE_BANK.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // SET_ACTIVE_BANK
    case constants.SET_ACTIVE_BANK.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.SET_ACTIVE_BANK.SUCCESS:
      return {
        ...state,
        active: payload,
      };
    case constants.SET_ACTIVE_BANK.FAIL:
      return {
        ...state,
        error,
      };
    case constants.SET_ACTIVE_BANK.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // GET_BANK_CONFIG
    case constants.GET_BANK_CONFIG.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_BANK_CONFIG.SUCCESS:
      return {
        ...state,
        config: {
          ...state.config,
          [payload.bank]: payload.config,
        },
      };
    case constants.GET_BANK_CONFIG.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_BANK_CONFIG.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // FORGOT_PASSWORD
    case FORGOT_PASSWORD.SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
}
