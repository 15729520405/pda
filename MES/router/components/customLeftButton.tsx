/**
 * Title        ：自定义返回按钮
 * Desc         ：自定义堆栈式导航栏返回按钮
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/03/15
 */

import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Adaptation from '~/utils/adaptation';
import MesIcon from '~/components/Icons';
const adaptation = new Adaptation();
// 自定义标签组件
export default function CustomLeftButton(props: any) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.leftBox]}>
                <MesIcon name="icon-sharp-left" size={adaptation.setW(40)} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    leftBox: {
        paddingLeft: adaptation.setW(10),
        paddingRight: adaptation.setW(10),
        width: adaptation.setW(60),
        alignSelf: 'center',
    },
});
