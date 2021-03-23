import { StyleSheet } from 'react-native';
import Adaptation from '~/utils/adaptation';
const adaptation = new Adaptation();
const styles = StyleSheet.create({
    btnBox: {},
    btnContent: {
        height: adaptation.setH(88),
        borderRadius: adaptation.setW(20),
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnText: {
        fontSize: adaptation.setF(34),
        fontFamily: 'SourceHanSansK-Normal',
    },
});

export default styles;
