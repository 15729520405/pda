import { StyleSheet } from 'react-native';
import Adaptation from '~/utils/adaptation';
const adaptation = new Adaptation();
export const closeIconSize = adaptation.setW(36);
export const contentH = adaptation.setH() * 0.7;
export const itemHeight = adaptation.setH(80);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        position: 'absolute',
        bottom: 0,
        width: adaptation.setW(),
        borderTopRightRadius: adaptation.setH(20),
        borderTopLeftRadius: adaptation.setH(20),
        backgroundColor: 'white',
    },
    header: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: adaptation.setH(66),
    },
    title: {
        fontSize: adaptation.setF(26),
    },
    close: {
        position: 'absolute',
        right: adaptation.setW(20),
        top: adaptation.setH(14),
    },
    nav: {
        paddingBottom: adaptation.setW(26),
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    navItem: {
        flexDirection: 'row',
        height: adaptation.setH(80),
    },
    navItemGuide: {
        height: '100%',
        width: adaptation.setW(60),
        justifyContent: 'center',
        alignItems: 'center',
    },
    navItemGuideSpot: {
        borderRadius: adaptation.setW(10),
        height: adaptation.setH(14),
        width: adaptation.setW(14),
        backgroundColor: 'rgba(255, 119, 9, 1.0)',
    },
    navItemGuideSpotActive: {
        borderRadius: adaptation.setW(7),
        height: adaptation.setH(14),
        width: adaptation.setW(14),
        borderColor: 'rgba(255, 119, 9, 1.0)',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff',
    },
    navItemGuideLine: {
        position: 'absolute',
        left: adaptation.setW(29),
        width: adaptation.setW(1),
        height: '50%',
        backgroundColor: 'rgba(255, 119, 9, 1.0)',
        zIndex: -1,
    },
    TopLine: {
        top: 0,
    },
    BottomLine: {
        bottom: 0,
    },
    navTextBox: {
        height: '100%',
        justifyContent: 'center',
        paddingLeft: adaptation.setW(26),
    },
    navText: {
        fontSize: adaptation.setF(28),
    },
    navTextActive: {
        color: 'rgba(255, 119, 9, 1.0)',
    },
    itemNormal: {
        backgroundColor: 'white',
    },
    itemActive: {
        backgroundColor: 'rgba(255, 119, 9, 0.5)',
    },
    autoFill: {
        flex: 1,
    },
    item: {
        height: itemHeight,
        justifyContent: 'center',
        paddingLeft: adaptation.setW(40),
    },
});
export default styles;
