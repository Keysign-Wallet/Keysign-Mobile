import {Alert} from 'react-native';
import {PrimaryValidator} from 'thenewboston';

import * as constants from './constants';
import * as walletStorage from '../../config/walletStorage';

import {getPassword} from '../../auth/redux/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * GET WALLETS
 */
export const getWallets = cb => async (dispatch, getState) => {
  try {
    dispatch({type: constants.GET_WALLETS.REQUEST});

    const mk = getPassword(getState());

    if (mk) {
      const payload = await walletStorage.getWallets(mk);

      dispatch({
        type: constants.GET_WALLETS.SUCCESS,
        payload,
      });
    }
  } catch (error) {
    dispatch({type: constants.GET_WALLETS.FAIL, error});
  } finally {
    dispatch({type: constants.GET_WALLETS.COMPLETE});
  }
};

/**
 * CREATE WALLET
 */
export const createWallet =
  (walletName, signingKey, cb) => async (dispatch, getState) => {
    try {
      dispatch({type: constants.CREATE_WALLET.REQUEST});

      const mk = getPassword(getState());
      const payload = await walletStorage.createWallet(
        mk,
        walletName,
        signingKey,
      );

      dispatch({
        type: constants.CREATE_WALLET.SUCCESS,
        payload,
      });
      if (typeof cb === 'function') {
        cb();
      }
    } catch (error) {
      dispatch({type: constants.CREATE_WALLET.FAIL, error});
      Alert.alert('Error', error.message);
    } finally {
      dispatch({type: constants.CREATE_WALLET.COMPLETE});
    }
  };

/**
 * SELECT WALLET
 */
export const selectWallet = id => async dispatch => {
  try {
    dispatch({
      type: constants.SELECT_WALLET.REQUEST,
      payload: id,
    });

    await AsyncStorage.setItem('@keysign/selected_wallet', id);

    dispatch({type: constants.SELECT_WALLET.SUCCESS});
  } catch (error) {
    dispatch({type: constants.SELECT_WALLET.FAIL, error});
  } finally {
    dispatch({type: constants.SELECT_WALLET.COMPLETE});
  }
};

/**
 * GET SELECTED WALLET
 */
export const getSelectedWallet = () => async dispatch => {
  try {
    dispatch({type: constants.GET_SELECTED_WALLET.REQUEST});

    const payload = await AsyncStorage.getItem('@keysign/selected_wallet');

    dispatch({
      type: constants.GET_SELECTED_WALLET.SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({type: constants.GET_SELECTED_WALLET.FAIL, error});
  } finally {
    dispatch({type: constants.GET_SELECTED_WALLET.COMPLETE});
  }
};

/**
 * DELETE WALLET
 */
export const deleteWallet = (id, cb) => async (dispatch, getState) => {
  try {
    dispatch({type: constants.DELETE_WALLET.REQUEST});

    const mk = getPassword(getState());
    const payload = await walletStorage.deleteWallet(mk, id);

    dispatch({
      type: constants.DELETE_WALLET.SUCCESS,
      payload,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.DELETE_WALLET.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.DELETE_WALLET.COMPLETE});
  }
};

/**
 * GET_WALLET_BALANCE
 */
export const getWalletBalance = (id, bankConfig, cb) => async dispatch => {
  try {
    dispatch({type: constants.GET_WALLET_BALANCE.REQUEST});

    const primaryValidator = new PrimaryValidator(
      `${bankConfig.primary_validator.protocol}://${
        bankConfig.primary_validator.ip_address
      }${
        bankConfig.primary_validator.port === null
          ? ''
          : `:${bankConfig.primary_validator.port}`
      }`,
    );
    const {balance} = await primaryValidator.getAccountBalance(id);

    dispatch({
      type: constants.GET_WALLET_BALANCE.SUCCESS,
      payload: {
        id,
        balance,
        balanceInUSD: balance && balance * 0.02,
      },
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.GET_WALLET_BALANCE.FAIL, error});
  } finally {
    dispatch({type: constants.GET_WALLET_BALANCE.COMPLETE});
  }
};

/**
 * SYNC_WALLETS
 */
export const syncWallets = (data, cb) => async (dispatch, getState) => {
  try {
    dispatch({type: constants.SYNC_WALLETS.REQUEST});

    const mk = getPassword(getState());
    const payload = await walletStorage.syncWallets(mk, data);

    dispatch({
      type: constants.SYNC_WALLETS.SUCCESS,
      payload,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.SYNC_WALLETS.FAIL, error});
    if (typeof cb === 'function') {
      cb(error);
    }
  } finally {
    dispatch({type: constants.SYNC_WALLETS.COMPLETE});
  }
};

/**
 * IMPORT_WALLETS
 */
export const importWallets = (file, cb) => async (dispatch, getState) => {
  try {
    dispatch({type: constants.IMPORT_WALLETS.REQUEST});

    const mk = getPassword(getState());
    const payload = await walletStorage.importWallets(mk, file);

    dispatch({
      type: constants.IMPORT_WALLETS.SUCCESS,
      payload,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.IMPORT_WALLETS.FAIL, error});
    if (typeof cb === 'function') {
      cb(error);
    }
  } finally {
    dispatch({type: constants.IMPORT_WALLETS.COMPLETE});
  }
};
