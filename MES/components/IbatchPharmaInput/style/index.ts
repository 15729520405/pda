import { StyleSheet } from 'react-native';
import Adaptation from '~/utils/adaptation';
const adaptation = new Adaptation();
const styles = StyleSheet.create({
    box: {
        position: 'relative',
    },
    inputText: {
        textAlign: 'center',
        height: adaptation.setH(88),
        borderRadius: adaptation.setW(20),
        color: '#999',
        fontSize: adaptation.setF(34),
    },
    clear: {
        position: 'absolute',
        right: adaptation.setW(10),
        top: '50%',
        marginTop: adaptation.setH(-20),
    },
});

export default styles;
