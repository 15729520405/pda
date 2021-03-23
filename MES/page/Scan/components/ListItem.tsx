/**
 * Title        ：物料子项
 * Desc         ：查询页中列表的子项
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/24
 */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
const adaptation = new Adaptation();
const lineH = adaptation.setH(20);
const stripHeight = adaptation.setH(60);
const paddingBT = adaptation.setH(20);
const contentH = stripHeight * 6;
export const itemHeight = paddingBT * 2 + lineH + contentH;
export default class InstructionListItem extends React.PureComponent<any> {
    public constructor(props: any) {
        super(props);
    }

    // 格式化 地址
    private formatLocation = (str: string) => {
        if (str) {
            str = str
                .replace(/,cn=/g, '.')
                .replace(/,/, '')
                .replace(/cn=/g, '');
        }
        return str;
    };
    public render() {
        let ltMap = [
            ['物料件号', 'no'],
            ['物料代码', 'matCode'],
            ['物料名称', 'matName'],
            ['物料状态', 'batchStatusName'],
            ['数量', 'currentQuanlity'],
            ['位置', 'location'],
        ];
        let { onPress, index, pageType, ...materialDto } = this.props;
        let backgroundColor = index === 0 ? 'rgba(0,255,255,1.0)' : '#fff';
        return (
            <IbatchPharmaButton
                touchableType="highlight"
                onPress={() => {
                    onPress(materialDto);
                }}>
                <View style={[styles.box, { backgroundColor: backgroundColor }]}>
                    <View style={styles.line} />
                    {ltMap.map((lt) => (
                        <View style={styles.strip} key={this.props.id + lt[1]}>
                            <Text style={[styles.label, styles.fontStyle]}>{lt[0]}：</Text>
                            {lt[1] === 'location' && (
                                <Text style={[styles.text, styles.fontStyle]}>
                                    {this.formatLocation(this.props[lt[1]])}
                                </Text>
                            )}
                            {lt[1] === 'currentQuanlity' && (
                                <Text style={[styles.text, styles.fontStyle]}>
                                    {this.props[lt[1]]}
                                    {this.props.uomSymbol}
                                </Text>
                            )}
                            {lt[1] !== 'currentQuanlity' && lt[1] !== 'location' && (
                                <Text style={[styles.text, styles.fontStyle]}>{this.props[lt[1]]}</Text>
                            )}
                        </View>
                    ))}
                    {pageType > 0 && (
                        <View style={[styles.tag, index === 0 ? styles.tagActive : styles.tagNormal]}>
                            <Text style={[styles.tagText, index === 0 ? styles.tagActiveText : styles.tagNormalText]}>
                                {pageType === 1 && '已移库'}
                                {pageType === 2 && '已出库'}
                            </Text>
                        </View>
                    )}
                </View>
            </IbatchPharmaButton>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        paddingBottom: adaptation.setH(20),
        height: contentH + paddingBT * 2 + lineH,
    },
    line: {
        marginBottom: adaptation.setH(20),
        height: lineH,
        backgroundColor: '#f7f7f7',
    },
    strip: {
        paddingLeft: adaptation.setW(30),
        height: stripHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fontStyle: {
        fontFamily: 'SourceHanSansK-Normal',
        fontSize: adaptation.setF(28),
        includeFontPadding: false,
        lineHeight: adaptation.setF(100),
    },
    label: {
        paddingRight: adaptation.setW(30),
        width: adaptation.setW(180),
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    text: {
        flex: 1,
        color: '#666',
    },
    tag: {
        position: 'absolute',
        right: adaptation.setW(20),
        top: adaptation.setH(40),
        paddingLeft: adaptation.setW(20),
        paddingRight: adaptation.setW(20),
        paddingTop: adaptation.setH(10),
        paddingBottom: adaptation.setH(10),
        borderRadius: adaptation.setW(4),
    },
    tagNormal: {
        backgroundColor: 'rgba(204,204,204,1.0)',
    },
    tagActive: {
        backgroundColor: 'rgba(204,204,102,1.0)',
    },
    tagText: {
        fontSize: adaptation.setF(20),
    },
    tagNormalText: {
        color: '#fff',
    },
    tagActiveText: {
        color: '#333',
    },
});
