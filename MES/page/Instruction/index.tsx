/**
 * Title        ：操作指令页
 * Desc         ：岗位下的操作指令
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/15  by jixianjing
*/

import React from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet
} from 'react-native';
import List from '~/components/List';
import ListItem, { ItemHeight } from './components/ListItem';
import Adaptation from '~/utils/adaptation';                                // 屏幕适配类
import InstructionApi from '~/utils/api/instruction';                       // 指令接口
import { InstructionScreenProps } from '~/router';
import { connect } from 'react-redux';
import { InitialStateITF, UserInfo } from '~/store';
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import MesIcon from '~/components/Icons';
const adaptation = new Adaptation();

interface InstructionState {
    isLoding: boolean
    refreshing: boolean
    InstructionList: any[]
}

interface Props extends InstructionScreenProps {
    userInfo: InitialStateITF['userInfo']
}

class Instruction extends React.Component<Props, InstructionState> {
    private preworkCenterId: number = 0;   // 记录上一次的岗位id
    public constructor(props: Props) {
        super(props);
        this.state = {
            isLoding: false,
            refreshing: false,
            InstructionList: []
        }
    }
    // 防止重复渲染(redux 渲染比 屏幕卸载快，会导致userInfo === null 获取值报错的问题)
    public shouldComponentUpdate(nextProps: any, nextState: any) {
        let nextUserInfo = nextProps.userInfo;
        // 只有workCenterId有值，才刷新界面
        if(nextUserInfo !== null && nextUserInfo.workCenterId){
            this.preworkCenterId = this.props.userInfo?.workCenterId as number;
            return true;
        }
        else {
            return false;
        }
    }

    public async componentDidMount() {
        await this.loadListData();
    }

    public async componentDidUpdate() {
        // 如果岗位id有变化则刷新界面
        if(this.preworkCenterId !== this.props.userInfo?.workCenterId) {
            await this.loadListData();
        }
    }

    // 刷新
    private onRefresh = async () => {
        this.setState({
            refreshing: true
        })
        await this.loadListData();
        this.setState({
            refreshing: false,
        })
    }

    // 触底
    private onEndReached = () => {
        this.setState({
            isLoding: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    isLoding: false
                })
            }, 2000)
        });
    }

    // 去查询页
    private scan = () => {
        this.props.navigation.navigate('QueryScreen');
    }

    private loadListData = async () => {
        let { userId, workCenterId } = this.props.userInfo as UserInfo;
        let param = {
            work_center_id: workCenterId,
            user_id: userId
        }
        let result = await InstructionApi.queryWorkCenterOrder(param);
        this.setState({
            InstructionList: result.data
        });
    }

    public render() {
        let { isLoding, refreshing, InstructionList } = this.state;
        let userInfo = this.props.userInfo as UserInfo;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.title}>&lt;{userInfo.wkcName}&gt;</Text>
                    <IbatchPharmaButton touchableType='withoutFeedback' boxStyle={styles.scanBox} onPress={this.scan}>
                        <View style={styles.scan}>
                            <MesIcon name={'scan'} size={adaptation.setH(50)} color='#666'></MesIcon>
                        </View>
                    </IbatchPharmaButton>
                </View>
                <List data={InstructionList}
                    itemHeight={ItemHeight}
                    isLoding={isLoding}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                    refreshing={refreshing}
                    initialNumToRender={4}
                >
                    <ListItem />
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    header: {
        height: adaptation.setH(88),
        backgroundColor: 'white',
        position: 'relative'
    },
    title: {
        fontFamily: 'SourceHanSansK-Normal',
        color: '#333',
        fontSize: adaptation.setF(60),
        fontWeight: "bold",
        textAlign: 'center',
        lineHeight: adaptation.setH(88),
    },
    scanBox: {
        position: 'absolute',
        top: adaptation.setH(14),
        right: 0,
    },
    scan: {
        height: adaptation.setH(60),
        width: adaptation.setW(88),
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = (state: InitialStateITF) =>({
    userInfo: state.userInfo
});

export default connect(
    mapStateToProps
)(Instruction);
