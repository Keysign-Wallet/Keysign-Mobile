import {actionGenerator} from '../../util/reduxHelpers';

export const GET_BANKS = actionGenerator('BANKS/GET_BANKS');
export const CREATE_BANK = actionGenerator('BANKS/CREATE_BANK');
export const DELETE_BANK = actionGenerator('BANKS/DELETE_BANK');
export const SET_ACTIVE_BANK = actionGenerator('BANKS/SET_ACTIVE_BANK');
export const GET_BANK_CONFIG = actionGenerator('BANKS/GET_BANK_CONFIG');
