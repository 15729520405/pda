import { StyleSheet } from 'react-native';
import Adaptation from '~/utils/adaptation';
const adaptation = new Adaptation();
export const itemHeight = adaptation.setH(80);
const styles = StyleSheet.create({
    item: {
        height: itemHeight,
        justifyContent: 'center',
        paddingLeft: adaptation.setW(40),
    },
});
export default styles;
