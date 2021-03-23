/**
 * Title        ：查询详情页
 * Desc         ：展示查询页中列表子项的详情
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/24
 */

import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { MoveBoundDetailScreenProps } from '~/router';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import IbcpDate from '@ibcp/ibcp-core/src/data-handle/ibcp-date';
import SelectLocation from '~/components/SelectLocation';
import ScanApi from '~/utils/api/scan';
const adaptation = new Adaptation();
interface State {
    location: string;
}

interface Props extends MoveBoundDetailScreenProps {}

export default class MoveBoundDetail extends React.PureComponent<Props, State> {
    private static location: string = ''; // 缓存地址
    public constructor(props: Props) {
        super(props);
        this.state = {
            location: '',
        };
    }

    public static getDerivedStateFromProps(nextProps: any, nextState: State) {
        let propsLocation = nextProps.route.params.detailInfo.location;
        let stateLocation = nextState.location;
        // 第一次进入或多次进入
        if (MoveBoundDetail.location !== propsLocation || stateLocation === '') {
            MoveBoundDetail.location = propsLocation;
            return {
                location: nextProps.route.params.detailInfo.location,
            };
        } else {
            return null;
        }
    }

    // 确认出库
    private confirm = async () => {
        let { callback, detailInfo } = this.props.route.params;
        let { goBack } = this.props.navigation;
        let { location } = this.state;
        let param = {
            sid: '0', // 签名id
            tuUuidList: [detailInfo.uuid], // 物料件uuidList
            targetLocation: this.state.location, // 目标位置
        };
        await ScanApi.moveBoundMaterial(param);
        typeof callback === 'function' && callback(location);
        goBack();
    };

    // 设置location
    private setLocation = async () => {
        SelectLocation.show((item) => {
            this.setState({
                location: item.location,
            });
        }, this.state.location);
    };

    public render() {
        let detailInfo = this.props.route.params.detailInfo;
        let { location } = this.state;
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
                                <TextFormater
                                    type={lt[1]}
                                    str={detailInfo[lt[1]]}
                                    uomSymbol={detailInfo.uomSymbol}
                                    location={location}
                                    setLocation={this.setLocation}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.backArea}>
                    <IbatchPharmaButton
                        touchableType="nativeFeedback"
                        text="取消"
                        style={styles.backBt}
                        textStyle={styles.backText}
                        onPress={this.props.navigation.goBack}
                    />
                    <IbatchPharmaButton
                        touchableType="nativeFeedback"
                        text="确认移库"
                        style={styles.backBt}
                        textStyle={styles.backText}
                        onPress={this.confirm}
                    />
                </View>
            </View>
        );
    }
}

// 格式化文本
function TextFormater(props: { type: string; str: any; uomSymbol: string; location: string; setLocation: () => void }) {
    let { type, str, uomSymbol, location, setLocation } = props;
    switch (type) {
        case 'location':
            return (
                <View style={styles.selectBox}>
                    <View style={styles.selectTextBox}>
                        <Text
                            style={[styles.text, styles.fontStyle, { fontSize: adaptation.setF(24) }]}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {location && SelectLocation.formatLocation(location)}
                        </Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setLocation();
                        }}>
                        <View style={styles.selectBtBox}>
                            <Text style={styles.selectBtText}>选择</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
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
            } else {
                str = '';
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
        alignItems: 'center',
        flexDirection: 'row',
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
        paddingTop: adaptation.setH(24),
        paddingBottom: adaptation.setH(24),
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    backBt: {
        height: adaptation.setH(120),
        width: adaptation.setW(200),
    },
    backText: {
        fontSize: adaptation.setF(24),
    },
    selectBox: {
        flexDirection: 'row',
        height: '100%',
    },
    selectTextBox: {
        paddingLeft: adaptation.setW(20),
        width: adaptation.setW(300),
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectBtBox: {
        backgroundColor: '#2ea99d',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: adaptation.setW(100),
        borderTopRightRadius: adaptation.setW(5),
        borderBottomRightRadius: adaptation.setW(5),
    },
    selectBtText: {
        color: '#fff',
        fontSize: adaptation.setF(20),
    },
});
