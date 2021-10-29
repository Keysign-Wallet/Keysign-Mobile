import * as constants from './constants';
import {FORGOT_PASSWORD} from '../../auth/redux/constants';
import {normalize, add, remove} from '../../util/reduxHelpers';

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
    // SELECTED FRIEND
    case constants.SELECT_FRIEND:
      return {
        ...state,
        selected: payload,
      };

    // GET FRIENDS
    case constants.GET_FRIENDS.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.GET_FRIENDS.SUCCESS:
      return normalize(state, payload);
    case constants.GET_FRIENDS.FAIL:
      return {
        ...state,
        error,
      };
    case constants.GET_FRIENDS.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // CREATE FRIEND
    case constants.CREATE_FRIEND.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.CREATE_FRIEND.SUCCESS:
      return add(state, payload);
    case constants.CREATE_FRIEND.FAIL:
      return {
        ...state,
        error,
      };
    case constants.CREATE_FRIEND.COMPLETE:
      return {
        ...state,
        loading: false,
      };

    // DELETE FRIEND
    case constants.DELETE_FRIEND.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.DELETE_FRIEND.SUCCESS:
      return remove(state, payload);
    case constants.DELETE_FRIEND.FAIL:
      return {
        ...state,
        error,
      };
    case constants.DELETE_FRIEND.COMPLETE:
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
