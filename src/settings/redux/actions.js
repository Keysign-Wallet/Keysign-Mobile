import {Alert} from 'react-native';

import * as constants from './constants';
import * as settingsStorage from '../../config/settingsStorage';

/**
 * GET_SETTINGS
 */
export const getSettings = cb => async dispatch => {
  try {
    dispatch({type: constants.GET_SETTINGS.REQUEST});

    const payload = await settingsStorage.getSettings();

    dispatch({
      type: constants.GET_SETTINGS.SUCCESS,
      payload,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.GET_SETTINGS.FAIL, error});
  } finally {
    dispatch({type: constants.GET_SETTINGS.COMPLETE});
  }
};

/**
 * UPDATE_SETTINGS
 */
export const updateSettings = (update, cb) => async dispatch => {
  try {
    dispatch({type: constants.UPDATE_SETTINGS.REQUEST});

    await settingsStorage.updateSettings(update);

    dispatch({
      type: constants.UPDATE_SETTINGS.SUCCESS,
      payload: update,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.UPDATE_SETTINGS.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.UPDATE_SETTINGS.COMPLETE});
  }
};
