import {actionGenerator} from '../../util/reduxHelpers';

export const GET_WALLETS = actionGenerator('WALLET/GET_WALLETS');
export const CREATE_WALLET = actionGenerator('WALLET/CREATE_WALLET');
export const DELETE_WALLET = actionGenerator('WALLET/DELETE_WALLET');
export const SELECT_WALLET = actionGenerator('WALLET/SELECT_WALLET');
export const GET_SELECTED_WALLET = actionGenerator(
  'WALLET/GET_SELECTED_WALLET',
);
export const GET_WALLET_BALANCE = actionGenerator('WALLET/GET_WALLET_BALANCE');
export const SYNC_WALLETS = actionGenerator('WALLET/SYNC_WALLETS');
export const IMPORT_WALLETS = actionGenerator('WALLET/IMPORT_WALLETS');
