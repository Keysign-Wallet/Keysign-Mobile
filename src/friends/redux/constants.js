import {actionGenerator} from '../../util/reduxHelpers';

export const SELECT_FRIEND = 'FRIENDS/SELECT_FRIEND';
export const GET_FRIENDS = actionGenerator('FRIENDS/GET_FRIENDS');
export const CREATE_FRIEND = actionGenerator('FRIENDS/CREATE_FRIEND');
export const DELETE_FRIEND = actionGenerator('FRIENDS/DELETE_FRIEND');
