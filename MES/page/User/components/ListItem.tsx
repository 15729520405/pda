/**
 * Title        ：用户信息的展示组件
 * Desc         ：用户信息的展示组件
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/03/15
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import MesIcon from '~/components/Icons'; // Mes系统图标
interface ListItemProps {
    title?: string;
    text?: string;
    iconName: string;
    callback?: () => void;
}
const adaptation = new Adaptation();
const searChIcon = adaptation.setH(56); // 搜索图标大小
const arrowIcon = adaptation.setH(40); // 箭头图标大小
const styles = StyleSheet.create({
    box: {
        marginTop: adaptation.setH(20),
        paddingLeft: adaptation.setW(30),
        paddingRight: adaptation.setW(30),
        height: adaptation.setH(110),
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        marginLeft: adaptation.setW(25),
        fontSize: adaptation.setF(28),
        flex: 1,
        color: '#666',
    },
    rightBox: {
        // width: adaptation.setW(160),
        // alignItems: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: adaptation.setF(28),
        lineHeight: adaptation.setH(30),
        color: '#666',
        fontFamily: 'SourceHanSansK-Normal',
    },
    rightArrowBt: {
        marginLeft: adaptation.setH(10),
    },
});
export default function ListItem({ title, text, iconName, callback }: ListItemProps) {
    return (
        <View style={styles.box}>
            <MesIcon name={iconName} size={searChIcon} color="#666" />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rightBox}>
                {typeof callback === 'function' ? (
                    <IbatchPharmaButton touchableType="withoutFeedback" onPress={callback}>
                        <View style={styles.rightBox}>
                            {text && <Text style={styles.text}>{text}</Text>}
                            <View style={styles.rightArrowBt}>
                                <MesIcon name="icon-sharp-right" size={arrowIcon} color="#666" />
                            </View>
                        </View>
                    </IbatchPharmaButton>
                ) : (
                    text && <Text style={styles.text}>{text}</Text>
                )}
            </View>
        </View>
    );
}
