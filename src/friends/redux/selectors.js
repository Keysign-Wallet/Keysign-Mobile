import {createSelector} from 'reselect';

/**
 * Get loading
 */
export const getLoading = state => state.Friends.loading;

/**
 * Get error
 */
export const getError = state => state.Friends.error;

/**
 * Get byId
 */
export const getById = state => state.Friends.byId;

/**
 * Get all ids
 */
export const getAllIds = state => state.Friends.allIds;

/**
 * Get id
 */
const getId = (state, {id}) => id;

/**
 * Get selected
 */
export const getSelectedFriendId = state => state.Friends.selected;

/**
 * Get friends
 */
export const getFriends = createSelector([getAllIds, getById], (ids, byId) =>
  ids.map(id => byId[id]),
);

/**
 * Get selected friend
 */
export const getSelectedFriend = createSelector(
  [getById, getSelectedFriendId],
  (byId, id) => byId[id],
);

/**
 * Get friend by id
 */
export const getFriendById = createSelector(
  [getById, getId],
  (byId, id) => byId[id],
);

/**
 * Make get Friend by id
 */
export const makeGetFriendById = () =>
  createSelector([getById, getId], (byId, id) => byId[id]);
