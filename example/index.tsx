import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { atob, btoa } from 'js-base64';
import { Buffer } from 'buffer';

// @ts-ignore
global.atob = atob;
// @ts-ignore
global.btoa = btoa;
// @ts-ignore
global.Buffer = Buffer;

AppRegistry.registerComponent(appName, () => App);
