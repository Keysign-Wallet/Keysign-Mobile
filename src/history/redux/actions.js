import * as constants from './constants';
import axios from 'axios';

/**
 * SHOW_FEE
 */
export const setShowFee = payload => ({
  type: constants.SHOW_FEE,
  payload,
});

/**
 * TRANSACTIONS_GET
 */
export const getTransactions = (bankUrl, walletId) => async dispatch => {
  try {
    dispatch({type: constants.TRANSACTIONS_GET.REQUEST});

    const payload = await axios.get(
      `${bankUrl}/bank_transactions?account_number=${walletId}`,
    );

    dispatch({
      type: constants.TRANSACTIONS_GET.SUCCESS,
      payload: {
        data: payload.data.results,
        wallet: walletId,
      },
    });
  } catch (error) {
    dispatch({type: constants.TRANSACTIONS_GET.FAIL, error});
  } finally {
    dispatch({type: constants.TRANSACTIONS_GET.COMPLETE});
  }
};
