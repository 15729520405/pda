/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// 远程调试输出console.log和网络信息
if (GLOBAL.process.env.NODE_ENV === 'development') {
    GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}
AppRegistry.registerComponent(appName, () => App);
