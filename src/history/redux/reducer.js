import * as constants from './constants';
import {FORGOT_PASSWORD} from '../../auth/redux/constants';
import * as helpers from '../../util/reduxHelpers';

export const INITIAL_STATE = {
  byId: {},
  allIds: [],
  showFee: false,
  byWallet: {},
  error: null,
  loading: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  const {type, payload, error} = action;

  switch (type) {
    // SHOW_FEE
    case constants.SHOW_FEE:
      return {
        ...state,
        showFee: payload,
      };

    // TRANSACTIONS_GET
    case constants.TRANSACTIONS_GET.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case constants.TRANSACTIONS_GET.FAIL:
      return {
        ...state,
        error,
      };
    case constants.TRANSACTIONS_GET.SUCCESS:
      return {
        ...helpers.merge(state, payload.data),
        byWallet: {
          ...state.byWallet,
          [payload.wallet]: payload.data.map(item => item.id),
        },
      };
    case constants.TRANSACTIONS_GET.COMPLETE:
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
