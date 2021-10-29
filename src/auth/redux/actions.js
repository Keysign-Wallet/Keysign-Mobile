import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';

import * as constants from './constants';
import * as walletStorage from '../../config/walletStorage';
import * as friendStorage from '../../config/friendStorage';
import * as bankStorage from '../../config/bankStorage';

/**
 * CREATE PASSWORD
 */
export const getPassword = () => async dispatch => {
  try {
    dispatch({type: constants.GET_PASSWORD.REQUEST});

    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      dispatch({
        type: constants.GET_PASSWORD.SUCCESS,
        payload: credentials.password,
      });
    }
  } catch (error) {
    dispatch({type: constants.GET_PASSWORD.FAIL, error});
  } finally {
    dispatch({type: constants.GET_PASSWORD.COMPLETE});
  }
};

/**
 * CREATE PASSWORD
 */
export const createPassword = password => async dispatch => {
  try {
    dispatch({type: constants.CREATE_PASSWORD.REQUEST});

    // Store the credentials
    await Keychain.setGenericPassword('@keysign/password', password);

    dispatch({
      type: constants.CREATE_PASSWORD.SUCCESS,
      payload: password,
    });
  } catch (error) {
    dispatch({type: constants.CREATE_PASSWORD.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.CREATE_PASSWORD.COMPLETE});
  }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = () => async dispatch => {
  try {
    dispatch({type: constants.FORGOT_PASSWORD.REQUEST});

    await walletStorage.deleteAllWallets();
    await friendStorage.deleteAllFriends();
    await bankStorage.deleteAllBanks();
    await Keychain.resetGenericPassword();

    dispatch({type: constants.FORGOT_PASSWORD.SUCCESS});
  } catch (error) {
    dispatch({type: constants.FORGOT_PASSWORD.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.FORGOT_PASSWORD.COMPLETE});
  }
};

/**
 * CHANGE_PASSWORD
 */
export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({type: constants.CHANGE_PASSWORD.REQUEST});

    await Keychain.resetGenericPassword();
    await Keychain.setGenericPassword('@keysign/password', newPassword);
    await walletStorage.updateMasterKey(oldPassword, newPassword);

    dispatch({
      type: constants.CHANGE_PASSWORD.SUCCESS,
      payload: newPassword,
    });
  } catch (error) {
    dispatch({type: constants.CHANGE_PASSWORD.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.CHANGE_PASSWORD.COMPLETE});
  }
};

/**
 * PASSWORD LOGIN
 */
export const login = () => ({
  type: constants.LOGIN,
});

/**
 * LOGOUT
 */
export const logout = () => ({
  type: constants.LOGOUT,
});
