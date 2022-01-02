import {Alert, I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

import * as constants from './constants';
import * as settingsStorage from '../../config/settingsStorage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {LOCALES} from '../../lang';

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

    if (update.language) {
      const lang = LOCALES.find(item => item.value === update.language);

      if (lang) {
        if (lang.isRTL) {
          if (!I18nManager.isRTL) {
            await I18nManager.forceRTL(true);
            await AsyncStorageLib.setItem('@keysign/restart', 'true');
            RNRestart.Restart();
          }
        } else {
          if (I18nManager.isRTL) {
            await I18nManager.forceRTL(false);
            await AsyncStorageLib.setItem('@keysign/restart', 'true');
            RNRestart.Restart();
          }
        }
      }
    }

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
