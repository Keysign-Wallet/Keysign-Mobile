import {Alert} from 'react-native';

import * as constants from './constants';
import * as friendStorage from '../../config/friendStorage';

/**
 * SELECT FRIEND
 */
export const selectFriend = payload => ({
  type: constants.SELECT_FRIEND,
  payload,
});

/**
 * GET FRIENDS
 */
export const getFriends = cb => async dispatch => {
  try {
    dispatch({type: constants.GET_FRIENDS.REQUEST});

    const payload = await friendStorage.getFriends();

    dispatch({
      type: constants.GET_FRIENDS.SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({type: constants.GET_FRIENDS.FAIL, error});
  } finally {
    dispatch({type: constants.GET_FRIENDS.COMPLETE});
  }
};

/**
 * CREATE FRIEND
 */
export const createFriend = (friendName, accountNo, cb) => async dispatch => {
  try {
    dispatch({type: constants.CREATE_FRIEND.REQUEST});

    const payload = await friendStorage.createFriend(friendName, accountNo);

    dispatch({
      type: constants.CREATE_FRIEND.SUCCESS,
      payload,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.CREATE_FRIEND.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.CREATE_FRIEND.COMPLETE});
  }
};

/**
 * DELETE FRIEND
 */
export const deleteFriend = (id, cb) => async dispatch => {
  try {
    dispatch({type: constants.DELETE_FRIEND.REQUEST});

    const payload = await friendStorage.deleteFriend(id);

    dispatch({
      type: constants.DELETE_FRIEND.SUCCESS,
      payload,
    });
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    dispatch({type: constants.DELETE_FRIEND.FAIL, error});
    Alert.alert('Error', error.message);
  } finally {
    dispatch({type: constants.DELETE_FRIEND.COMPLETE});
  }
};
