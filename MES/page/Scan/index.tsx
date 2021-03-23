/**
 * Title        ：扫描页面
 * Desc         ：扫描物料件
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/24
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScanScreenProps } from '~/router';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import IbatchPharmaInput from '~/components/IbatchPharmaInput';
import List from '~/components/List';
import ScanBarCode from '~/utils/scanBarCode';
import ScanApi from '~/utils/api/scan';
import ListItem, { itemHeight } from './components/ListItem';
import Toast from 'react-native-root-toast';

const adaptation = new Adaptation();

interface State {
    data: any[]; // 列表数据
    barcode: string; // 输入条码
}

interface Props extends ScanScreenProps {}

export default class Scan extends React.PureComponent<Props, State> {
    private ids: number[] = [];
    private isPDA: boolean = true; // 是否是PDA
    private isClick: boolean = false; // 是否点击,防止重复调用接口
    public constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            barcode: '',
        };
        try {
            // 初始化扫描服务
            ScanBarCode.init();
            // 监听扫描服务
            ScanBarCode.listenerScan(async (event) => {
                // 防止重复扫描，调用接口
                if (this.state.barcode !== event.barCode) {
                    this.setState(
                        {
                            barcode: event.barCode,
                        },
                        () => {
                            this.scan();
                        },
                    );
                }
            });
        } catch (error) {
            this.isPDA = false;
        }
    }

    public componentWillUnmount() {
        if (this.isPDA) {
            ScanBarCode.stopScan();
        }
    }

    // 扫描条码或二维码
    private scan = () => {
        // 条码有值直接调接口
        if (this.state.barcode && !this.isClick) {
            if (!this.isClick) {
                this.isClick = true;
                this.getDetail();
            }
        }
        // 没值掉扫描
        else {
            this.isPDA && ScanBarCode.starScan();
        }
    };

    // 获取输入的二维码
    private getInputBarcode = (text: string) => {
        this.setState({
            barcode: text,
        });
    };

    // 获取详细信息
    private getDetail = async () => {
        let {
            screenInfo: { type, name },
        } = this.props.route.params;
        let result = await ScanApi.scanMaterialParts({
            tuNo: '',
            barCode: this.state.barcode,
            flag: true,
        }).finally(() => {
            this.isClick = false;
        });
        let materialDto = result.data;
        switch (true) {
            // 查询
            case type === 0:
                let index = this.ids.findIndex((id) => id === materialDto.id);
                let data = this.state.data;
                // 重复
                if (index !== -1) {
                    data.unshift(data.splice(index, 1)[0]);
                    let oldId: number = this.ids.splice(index, 1)[0];
                    this.ids.unshift(oldId);
                } else {
                    this.ids.unshift(materialDto.id);
                    data.unshift(materialDto);
                }
                this.setState({
                    data: [...data],
                });
                this.props.navigation.navigate('QueryDetailScreen', { detailInfo: materialDto });
                break;
            // 移库或出库
            case type === 1 || type === 2:
                console.log(type);
                // 已消耗不能执行
                if (materialDto.consumed === true) {
                    Toast.show(`该物料已消耗，不能进行${name}`, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                    });
                    return;
                }
                if (materialDto.orderBatchNo) {
                    Toast.show(`该物料已经绑定指令，不能进行移库${name}`, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                    });
                    return;
                }
                switch (type) {
                    // 移库
                    case 1:
                        this.props.navigation.navigate('MoveBoundDetailScreen', {
                            detailInfo: materialDto,
                            callback: this.moveMaterialAfter(materialDto),
                        });
                        break;
                    // 出库
                    case 2:
                        this.props.navigation.navigate('OutBoundDetailScreen', {
                            detailInfo: materialDto,
                            callback: () => {
                                this.outMaterialAfter(materialDto);
                            },
                        });
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    // 点击子项跳转详情
    clickGotoDetail = (materialDto: any) => {
        let {
            screenInfo: { type },
        } = this.props.route.params;
        switch (type) {
            case 0:
                this.props.navigation.navigate('QueryDetailScreen', { detailInfo: materialDto });
                break;
            case 1:
                this.props.navigation.navigate('MoveBoundDetailScreen', {
                    detailInfo: materialDto,
                    callback: this.moveMaterialAfter(materialDto),
                });
                break;
            case 2:
                this.props.navigation.navigate('OutBoundDetailScreen', {
                    detailInfo: materialDto,
                    isComplete: true,
                    callback: () => {
                        this.moveMaterialAfter(materialDto);
                    },
                });
                break;
            default:
                break;
        }
    };

    // 移库之后
    private moveMaterialAfter = (materialDto: any) => {
        return (location: string) => {
            let index = this.ids.findIndex((id) => id === materialDto.id);
            let data = this.state.data;
            // 重复
            if (index !== -1) {
                // 删除重复的那条，然后把它放在第一条
                data.unshift({ ...data.splice(index, 1)[0], location });
                let oldId: number = this.ids.splice(index, 1)[0];
                this.ids.unshift(oldId);
            } else {
                this.ids.unshift(materialDto.id);
                data.unshift({ ...materialDto, location });
            }
            this.setState({
                data: [...data],
            });
        };
    };

    // 出库之后
    private outMaterialAfter = (materialDto: any) => {
        let index = this.ids.findIndex((id) => id === materialDto.id);
        let data = this.state.data;
        // 重复
        if (index !== -1) {
            // 删除重复的那条，然后把它放在第一条
            data.unshift(data.splice(index, 1)[0]);
            let oldId: number = this.ids.splice(index, 1)[0];
            this.ids.unshift(oldId);
        } else {
            this.ids.unshift(materialDto.id);
            data.unshift(materialDto);
        }
        this.setState({
            data: [...data],
        });
    };

    public render() {
        let { data } = this.state;
        let {
            screenInfo: { type },
        } = this.props.route.params;
        return (
            <View style={styles.container}>
                <List data={data} style={styles.List} itemHeight={itemHeight}>
                    <ListItem onPress={this.clickGotoDetail} pageType={type} />
                </List>
                <View style={styles.handBox}>
                    <IbatchPharmaInput
                        style={styles.input}
                        inputType="text"
                        placeholder="请输入条码"
                        getOutput={this.getInputBarcode}
                        value={this.state.barcode}
                        clear={true}
                    />
                    <IbatchPharmaButton
                        style={styles.scan}
                        touchableType="nativeFeedback"
                        text="扫描"
                        textStyle={styles.scanText}
                        onPress={this.scan}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    List: {
        flex: 1,
    },
    handBox: {
        padding: adaptation.setH(20),
        paddingLeft: adaptation.setH(40),
        paddingRight: adaptation.setH(40),
    },
    input: {
        backgroundColor: 'white',
        color: '#999',
        // fontFamily: 'SourceHanSansK-Normal',
    },
    scan: {
        marginTop: adaptation.setH(20),
    },
    scanText: {},
});
