import {Alert} from 'react-native';
import {Bank} from 'thenewboston';

import * as constants from './constants';
import * as bankStorage from '../../config/bankStorage';
import {getActiveBank} from './selectors';

const DEFAULT_BANK = 'https://bank.keysign.app';

/**
 * GET BANKS
 */
export const getBanks = cb => async dispatch => {
  try {
    dispatch({type: constants.GET_BANKS.REQUEST});

    const banks = await bankStorage.getBanks();
    const activeBank = await bankStorage.getActiveBank();

    dispatch({
      type: constants.GET_BANKS.SUCCESS,
      payload: {
        banks,
        active: activeBank,
      },
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.GET_BANKS.FAIL, error});
  } finally {
    dispatch({type: constants.GET_BANKS.COMPLETE});
  }
};

/**
 * CREATE BANK
 */
export const createBank = (bank, cb) => async dispatch => {
  try {
    dispatch({type: constants.CREATE_BANK.REQUEST});

    const payload = await bankStorage.createBank(bank);

    dispatch({
      type: constants.CREATE_BANK.SUCCESS,
      payload,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.CREATE_BANK.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.CREATE_BANK.COMPLETE});
  }
};

/**
 * DELETE_BANK
 */
export const deleteBank = (bank, cb) => async (dispatch, getState) => {
  try {
    dispatch({type: constants.DELETE_BANK.REQUEST});

    const activeBank = getActiveBank(getState());
    if (bank === activeBank) {
      await dispatch(setActiveBank(DEFAULT_BANK));
    }
    await bankStorage.deleteBank(bank);

    dispatch({
      type: constants.DELETE_BANK.SUCCESS,
      payload: bank,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.DELETE_BANK.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.DELETE_BANK.COMPLETE});
  }
};

/**
 * SET_ACTIVE_BANK
 */
export const setActiveBank = (bank, cb) => async dispatch => {
  try {
    dispatch({type: constants.SET_ACTIVE_BANK.REQUEST});

    await bankStorage.setActiveBank(bank);

    dispatch({
      type: constants.SET_ACTIVE_BANK.SUCCESS,
      payload: bank,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.SET_ACTIVE_BANK.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.SET_ACTIVE_BANK.COMPLETE});
  }
};

/**
 * GET_BANK_CONFIG
 */
export const getBankConfig = (bankUrl, cb) => async dispatch => {
  try {
    dispatch({type: constants.GET_BANK_CONFIG.REQUEST});

    const bank = new Bank(bankUrl);
    const payload = await bank.getConfig();

    dispatch({
      type: constants.GET_BANK_CONFIG.SUCCESS,
      payload: {
        bank: bankUrl,
        config: payload,
      },
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.GET_BANK_CONFIG.FAIL, error});
  } finally {
    dispatch({type: constants.GET_BANK_CONFIG.COMPLETE});
  }
};
