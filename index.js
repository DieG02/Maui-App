/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './src/v0.1/services/i18n-config';

AppRegistry.registerComponent(appName, () => App);
