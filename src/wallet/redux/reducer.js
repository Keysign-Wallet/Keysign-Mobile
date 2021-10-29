import * as constants from './constants';
import {FORGOT_PASSWORD} from '../../auth/redux/constants';
import {normalize, add, remove, update, merge} from '../../util/reduxHelpers';

export const INITIAL_STATE = {
  byId: {},
  allIds: [],
  selected: null,
  error: null,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const {type, error, payload} = action;

  switch (type) {
    // GET WALLETS
    case constants.GET_WALLETS.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_WALLETS.SUCCESS:
      return normalize(state, payload);
    case constants.GET_WALLETS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_WALLETS.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // CREATE WALLET
    case constants.CREATE_WALLET.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.CREATE_WALLET.SUCCESS:
      return add(state, payload);
    case constants.CREATE_WALLET.FAIL:
      return {
        ...state,
        error,
      };
    case constants.CREATE_WALLET.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // DELETE WALLET
    case constants.DELETE_WALLET.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.DELETE_WALLET.SUCCESS:
      return remove(state, payload);
    case constants.DELETE_WALLET.FAIL:
      return {
        ...state,
        error,
      };
    case constants.DELETE_WALLET.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // SELECT WALLET
    case constants.SELECT_WALLET.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        selected: payload,
      };
    case constants.SELECT_WALLET.SUCCESS:
      return state;
    case constants.SELECT_WALLET.FAIL:
      return {
        ...state,
        error,
      };
    case constants.SELECT_WALLET.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // GET SELECTED WALLET
    case constants.GET_SELECTED_WALLET.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_SELECTED_WALLET.SUCCESS:
      return {
        ...state,
        selected: payload,
      };
    case constants.GET_SELECTED_WALLET.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_SELECTED_WALLET.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // GET_WALLET_BALANCE
    case constants.GET_WALLET_BALANCE.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_WALLET_BALANCE.SUCCESS:
      return update(state, payload);
    case constants.GET_WALLET_BALANCE.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_WALLET_BALANCE.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // SYNC_WALLETS
    case constants.SYNC_WALLETS.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.SYNC_WALLETS.SUCCESS:
      return merge(state, payload);
    case constants.SYNC_WALLETS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.SYNC_WALLETS.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // IMPORT_WALLETS
    case constants.IMPORT_WALLETS.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.IMPORT_WALLETS.SUCCESS:
      return merge(state, payload);
    case constants.IMPORT_WALLETS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.IMPORT_WALLETS.COMPLETE:
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
