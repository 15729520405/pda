/**
 * Title        ：pharma页
 * Desc         ：各种查询
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/03/15
 */

import React from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Accordion from '~/components/Accordion';
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import { PharmaScreenProps } from '~/router';
import MesIcon from '~/components/Icons';
interface Props extends PharmaScreenProps {}
const adaptation = new Adaptation();
interface State {
    showIndex: number;
}

export default class Pharma extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            showIndex: 0,
        };
    }
    public componentDidMount() {}

    // 设置当前显示的banner
    private setShowIndex = (index: number) => {
        this.setState({
            showIndex: index,
        });
    };

    // banner被点击
    private gotoDetail = () => {
        console.log(this.state.showIndex);
    };

    // 查询
    private query = () => {
        this.props.navigation.navigate('ScanScreen', { screenInfo: { type: 0, name: '查询' } });
    };

    // 移库
    private movebound = () => {
        this.props.navigation.navigate('ScanScreen', { screenInfo: { type: 1, name: '移库' } });
    };

    // 出库
    private outbound = () => {
        this.props.navigation.navigate('ScanScreen', { screenInfo: { type: 2, name: '出库' } });
    };

    public render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.title}>iBatchPharma</Text>
                </View>
                <Swiper
                    containerStyle={styles.wrapper}
                    autoplay={true}
                    // autoplayTimeout={3}
                    dotStyle={{ bottom: adaptation.setH(-60) }}
                    activeDotStyle={{ bottom: adaptation.setH(-60) }}
                    onIndexChanged={this.setShowIndex}>
                    <IbatchPharmaButton touchableType="withoutFeedback" onPress={this.gotoDetail}>
                        <Image style={styles.banner} source={require('../../assets/images/banner1.jpg')} />
                    </IbatchPharmaButton>
                    <IbatchPharmaButton touchableType="withoutFeedback" onPress={this.gotoDetail}>
                        <Image style={styles.banner} source={require('../../assets/images/banner1.jpg')} />
                    </IbatchPharmaButton>
                    <IbatchPharmaButton touchableType="withoutFeedback" onPress={this.gotoDetail}>
                        <Image style={styles.banner} source={require('../../assets/images/banner1.jpg')} />
                    </IbatchPharmaButton>
                </Swiper>
                <View style={styles.accordionBox}>
                    <Accordion linkage={false} selectIndex={0} openAmimate={true}>
                        <Accordion.Panel title="查询">
                            <View style={styles.handBox}>
                                <IbatchPharmaButton
                                    touchableType="withoutFeedback"
                                    onPress={this.query}
                                    style={styles.handItem}>
                                    <View style={styles.handItem}>
                                        <View style={styles.funcIcon}>
                                            <MesIcon name={'search'} size={adaptation.setW(60)} color={'white'} />
                                        </View>
                                        <Text style={styles.foncText}>查询</Text>
                                    </View>
                                </IbatchPharmaButton>
                            </View>
                        </Accordion.Panel>
                        <Accordion.Panel title="物料">
                            <View style={styles.handBox}>
                                <IbatchPharmaButton
                                    touchableType="withoutFeedback"
                                    onPress={this.outbound}
                                    style={styles.handItem}>
                                    <View style={styles.handItem}>
                                        <View style={styles.funcIcon}>
                                            <MesIcon name={'search'} size={adaptation.setW(60)} color={'white'} />
                                        </View>
                                        <Text style={styles.foncText}>出库</Text>
                                    </View>
                                </IbatchPharmaButton>
                                <IbatchPharmaButton
                                    touchableType="withoutFeedback"
                                    onPress={this.movebound}
                                    style={styles.handItem}>
                                    <View style={styles.handItem}>
                                        <View style={styles.funcIcon}>
                                            <MesIcon name={'search'} size={adaptation.setW(60)} color={'white'} />
                                        </View>
                                        <Text style={styles.foncText}>移库</Text>
                                    </View>
                                </IbatchPharmaButton>
                            </View>
                        </Accordion.Panel>
                    </Accordion>
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
    header: {
        height: adaptation.setH(88),
        backgroundColor: 'white',
    },
    title: {
        fontSize: adaptation.setF(36),
        fontWeight: 'bold',
        fontFamily: 'SourceHanSansK-Normal',
        textAlign: 'center',
        lineHeight: adaptation.setH(88),
    },
    wrapper: {
        height: adaptation.setH(360),
        flex: 0,
    },
    banner: {
        width: '100%',
        height: adaptation.setH(320),
    },
    accordionBox: {
        paddingLeft: adaptation.setW(40),
        paddingRight: adaptation.setW(40),
    },
    handBox: {
        paddingLeft: adaptation.setW(16),
        paddingRight: adaptation.setW(16),
        flexDirection: 'row',
        // justifyContent: 'space-between',
        height: adaptation.setW(142),
    },
    funcIcon: {
        width: adaptation.setW(94),
        height: adaptation.setH(94),
        borderRadius: adaptation.setW(10),
        backgroundColor: '#2ea99d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    handItem: {
        marginRight: adaptation.setW(40),
        paddingBottom: adaptation.setH(30),
    },
    foncText: {
        marginTop: adaptation.setH(10),
        textAlign: 'center',
        color: '#666',
        fontSize: adaptation.setF(28),
        lineHeight: adaptation.setF(30),
        fontFamily: 'SourceHanSansK-Normal',
    },
});
