import {actionGenerator} from '../../util/reduxHelpers';

export const GET_PASSWORD = actionGenerator('AUTH/GET_PASSWORD');
export const CREATE_PASSWORD = actionGenerator('AUTH/CREATE_PASSWORD');
export const FORGOT_PASSWORD = actionGenerator('AUTH/FORGOT_PASSWORD');
export const CHANGE_PASSWORD = actionGenerator('AUTH/CHANGE_PASSWORD');
export const LOGIN = 'AUTH/LOGIN';
export const LOGOUT = 'AUTH/LOGOUT';
