import {combineReducers} from 'redux';

import AuthReducer from '../auth/redux/reducer';
import BanksReducer from '../banks/redux/reducer';
import WalletReducer from '../wallet/redux/reducer';
import FriendsReducer from '../friends/redux/reducer';
import HistoryReducer from '../history/redux/reducer';
import SettingsReducer from '../settings/redux/reducer';

/* ============================================================================
  Combine ALl Reducers
============================================================================= */
const rootReducer = combineReducers({
  Auth: AuthReducer,
  Banks: BanksReducer,
  Wallet: WalletReducer,
  Friends: FriendsReducer,
  History: HistoryReducer,
  Settings: SettingsReducer,
});

export default rootReducer;
