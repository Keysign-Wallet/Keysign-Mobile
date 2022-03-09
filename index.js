/**
 * @format
 */

import {AppRegistry} from 'react-native';

import './shim';
import './src/config/intl';
import './src/config/polyfill';

import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
