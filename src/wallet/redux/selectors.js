import {createSelector} from 'reselect';

/**
 * Get Loading
 */
export const getLoading = state => state.Wallet.loading;

/**
 * Get Error
 */
export const getError = state => state.Wallet.error;

/**
 * Get byId
 */
export const getById = state => state.Wallet.byId;

/**
 * Get all ids
 */
export const getAllIds = state => state.Wallet.allIds;

/**
 * Get Selected Wallet
 */
export const getSelected = state => state.Wallet.selected;

/**
 * Get id
 */
const getId = (state, {id}) => id;

/**
 * Get Selected Wallet
 */
export const getSelectedWallet = createSelector(
  [getById, getSelected],
  (byId, id) => byId[id],
);

/**
 * Get Wallet by id
 */
export const getWalletById = createSelector(
  [getById, getId],
  (byId, id) => byId[id],
);

/**
 * Make get Wallet by id
 */
export const makeGetWalletById = () =>
  createSelector([getById, getId], (byId, id) => byId[id]);
