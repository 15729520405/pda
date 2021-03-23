import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
const adaptation = new Adaptation();
const boxHeight = adaptation.setH(296);
const marginTop = adaptation.setH(20);
export const ItemHeight = boxHeight + marginTop;
export default class ListItem extends React.PureComponent<any> {
    public constructor(props: any) {
        super(props);
    }
    public render() {
        let { batchNo, code, mName, planQuantity, statusName } = this.props;
        return (
            <View style={styles.box}>
                <View style={styles.h1}>
                    <Text style={styles.phNo}>批号：{batchNo}</Text>
                    <Text style={styles.label}>&lt;{statusName}&gt;</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowText, styles.rowTitle]}>产品代码：</Text>
                    <Text style={[styles.rowText, styles.rowContent]}>{code}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowText, styles.rowTitle]}>产品名称：</Text>
                    <Text style={[styles.rowText, styles.rowContent]}>{mName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowText, styles.rowTitle]}>批量：</Text>
                    <Text style={[styles.rowText, styles.rowContent]}>{planQuantity}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        marginTop: marginTop,
        paddingLeft: adaptation.setW(30),
        paddingRight: adaptation.setW(20),
        backgroundColor: '#fff',
        height: boxHeight,
    },
    h1: {
        marginTop: adaptation.setH(30),
        flexDirection: 'row',
        height: adaptation.setH(44),
    },
    phNo: {
        fontFamily: 'SourceHanSansK-Normal',
        color: '#333',
        fontSize: adaptation.setF(32),
        flex: 1,
        height: adaptation.setH(44),
        lineHeight: adaptation.setH(44),
    },
    label: {
        paddingLeft: adaptation.setW(20),
        paddingRight: adaptation.setW(20),
        backgroundColor: '#2ea99d',
        borderRadius: adaptation.setW(10),
        fontSize: adaptation.setF(32),
        color: 'white',
        height: adaptation.setH(44),
        lineHeight: adaptation.setH(44),
    },
    row: {
        marginTop: adaptation.setH(16),
        flexDirection: 'row',
    },
    rowText: {
        height: adaptation.setH(44),
        lineHeight: adaptation.setH(44),
        color: '#666',
        fontSize: adaptation.setF(28),
        fontFamily: 'SourceHanSansK-Normal',
    },
    rowTitle: {
        width: adaptation.setW(180),
    },
    rowContent: {
        flex: 1,
    },
});
