import { createIconSet } from 'react-native-vector-icons';
import glyphMap from './mes-iconfont.json';

const Icon = createIconSet(glyphMap, 'mes-icon', 'mes-iconfont.ttf');
export default Icon;
export const Button = Icon.Button;
export const TabBarItem = Icon.TabBarItem;
export const TabBarItemIOS = Icon.TabBarItemIOS;
export const ToolbarAndroid = Icon.ToolbarAndroid;
export const getImageSource = Icon.getImageSource;
