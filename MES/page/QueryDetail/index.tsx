/**
 * Title        ：查询详情页
 * Desc         ：展示查询页中列表子项的详情
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/24
 */

import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { QueryDetailScreenProps } from '~/router';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import IbcpDate from '@ibcp/ibcp-core/src/data-handle/ibcp-date';
import SelectLocation from '~/components/SelectLocation';

const adaptation = new Adaptation();
interface State {}

interface Props extends QueryDetailScreenProps {}

export default class QueryDetail extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        let detailInfo = this.props.route.params.detailInfo;
        let ltMap = [
            ['物料件号', 'no'],
            ['物料代码', 'matCode'],
            ['物料名称', 'matName'],
            ['物料批次', 'batchNo'],
            ['物料状态', 'batchStatusName'],
            ['数量', 'currentQuanlity'],
            ['单位', 'uomSymbol'],
            ['批指令号', 'orderBatchNo'],
            ['产品代码', 'orderMaterialCode'],
            ['产品名称', 'orderMaterialName'],
            ['产品批号', 'orderNo'],
            ['有效期', 'batchExpDate'],
            ['复检期', 'batchInspDate'],
            ['制造商', 'batchManuName'],
            // ['供应商', ''],
            ['位置', 'location'],
        ];
        return (
            <View style={styles.container}>
                <View style={styles.detail}>
                    <ScrollView>
                        {ltMap.map((lt) => (
                            <View style={styles.strip} key={detailInfo.id + lt[1]}>
                                <Text style={[styles.label, styles.fontStyle]}>{lt[0]}：</Text>
                                <TextFormater type={lt[1]} str={detailInfo[lt[1]]} uomSymbol={detailInfo.uomSymbol} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.backArea}>
                    <IbatchPharmaButton
                        touchableType="nativeFeedback"
                        text="返回"
                        boxStyle={{ flex: 1 }}
                        style={styles.backBt}
                        textStyle={styles.backText}
                        onPress={this.props.navigation.goBack}
                    />
                </View>
            </View>
        );
    }
}

// 格式化文本
function TextFormater(props: { type: string; str: any; uomSymbol: string }) {
    let { type, str, uomSymbol } = props;
    switch (type) {
        case 'location':
            return <Text style={[styles.text, styles.fontStyle]}>{SelectLocation.formatLocation(str)}</Text>;
        case 'currentQuanlity':
            return (
                <Text style={[styles.text, styles.fontStyle]}>
                    {str}
                    {uomSymbol}
                </Text>
            );
        case 'batchExpDate':
        case 'batchInspDate':
            if (str) {
                str = new IbcpDate({
                    format: 'yyyy-MM-dd HH:mm:ss',
                    timeZone: '+8',
                    timeStamp: str,
                }).formattedTime;
            }
            return <Text style={[styles.text, styles.fontStyle]}>{str}</Text>;
        default:
            return <Text style={[styles.text, styles.fontStyle]}>{str}</Text>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    detail: {
        marginTop: adaptation.setH(20),
        paddingTop: adaptation.setH(30),
        paddingLeft: adaptation.setH(30),
        flex: 1,
        backgroundColor: '#fff',
    },
    strip: {
        height: adaptation.setH(54),
        flexDirection: 'row',
        alignItems: 'center',
    },
    fontStyle: {
        fontFamily: 'SourceHanSansK-Normal',
        fontSize: adaptation.setF(32),
        includeFontPadding: false,
        lineHeight: adaptation.setH(100),
    },
    label: {
        paddingRight: adaptation.setW(62),
        width: adaptation.setW(240),
        color: '#333',
        textAlign: 'right',
    },
    text: {
        flex: 1,
        color: '#666',
    },
    backArea: {
        paddingLeft: adaptation.setH(40),
        paddingRight: adaptation.setH(40),
        height: adaptation.setH(128),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    backBt: {},
    backText: {},
});
