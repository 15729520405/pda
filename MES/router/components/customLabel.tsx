/**
 * Title        ：自定义底部Tab子项组件
 * Desc         ：自定义底部Tab子项组件
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/03/15
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Adaptation from '~/utils/adaptation';
const adaptation = new Adaptation();
// 自定义标签组件
export default function CustomLabel(props: any) {
    let color = props.focused ? props.color : 'white';
    return (
        <View style={styles.labelBox}>
            <Text style={[styles.labelText, { color: props.color }]}>{props.title}</Text>
            <View style={[styles.labelLine, { backgroundColor: color }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    labelBox: {
        width: adaptation.setW(180),
        height: adaptation.setH(42),
        position: 'relative',
    },
    labelText: {
        fontFamily: 'SourceHanSansK-Normal',
        fontSize: adaptation.setF(26),
        textAlign: 'center',
        lineHeight: adaptation.setH(34),
    },
    labelLine: {
        height: adaptation.setH(8),
        width: adaptation.setW(180),
        position: 'absolute',
        left: 0,
        bottom: 0,
        borderRadius: adaptation.setH(4),
    },
});
