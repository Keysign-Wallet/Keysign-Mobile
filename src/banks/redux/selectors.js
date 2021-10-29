import {createSelector} from 'reselect';

/**
 * Get Laoding
 */
export const getLoading = state => state.Banks.loading;

/**
 * Get Error
 */
export const getError = state => state.Banks.error;

/**
 * Get banks
 */
export const getBanks = state => state.Banks.banks;

/**
 * Get config
 */
export const getConfig = state => state.Banks.config;

/**
 * Get active bank
 */
export const getActiveBank = state => state.Banks.active;

/**
 * Get active bank config
 */
export const getActiveBankConfig = createSelector(
  [getConfig, getActiveBank],
  (config, bank) => config[bank],
);
