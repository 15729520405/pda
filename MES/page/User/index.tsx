/**
 * Title        ：用户页
 * Desc         ：用户信息的展示与操作
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/03/15
 */

import React from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import ListItem from './components/ListItem';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import AsyncStorage from '@react-native-community/async-storage';
import UserApi from '~/utils/api/user';
import { UserScreenProps } from '~/router';
import { connect } from 'react-redux';
import { actions, InitialStateITF, UserInfo } from '~/store';
// @ts-ignore
import CookieManager from 'react-native-cookie';
import Path from '~/utils/http/path';
import ImagePicker, { Image as ImageITF } from 'react-native-image-crop-picker';
const adaptation = new Adaptation();

interface Props extends UserScreenProps {
    clearUserInfo: () => void;
    updateUserInfo: (userInfo: UserInfo) => void;
    userInfo: InitialStateITF['userInfo'];
}

class User extends React.Component<Props, any> {
    public constructor(props: Props) {
        super(props);
    }
    // 退出登录
    private logout = async () => {
        UserApi.loginOut();
        // 清除所有本地缓存
        await AsyncStorage.clear();
        // 清除Cookie
        await CookieManager.clear(Path.BASE_URL);
        // (清除用户信息)退出登录
        this.props.clearUserInfo();
    };
    // 岗位切换
    private gotoWorkCenter = () => {
        this.props.navigation.navigate('WorkCenterChangeScreen');
    };
    // 选择头像
    selectAvatar = async () => {
        let height = adaptation.setH(130);
        let width = adaptation.setW(130);
        let avatarObj = (await ImagePicker.openPicker({
            width,
            height,
            cropping: true,
        })) as ImageITF;
        console.log(avatarObj);
        this.props.updateUserInfo({
            ...(this.props.userInfo as UserInfo),
            avatar: avatarObj.path,
        });
    };
    // 防止重复渲染(redux 渲染比 屏幕卸载快，会导致userInfo === null 获取值报错的问题)
    public shouldComponentUpdate(nextProps: any) {
        return nextProps.userInfo !== null && nextProps.userInfo !== this.props.userInfo;
    }
    public render() {
        let { userInfo } = this.props;
        let { account, name, wkcCode, wkcName, ip, avatar } = userInfo as UserInfo;
        let avatarSource = require('../../assets/images/avatar.jpg');
        if (avatar) {
            avatarSource = { uri: avatar };
        }
        let work = `${wkcCode}(${wkcName})`;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View style={styles.userArea}>
                    <IbatchPharmaButton touchableType="withoutFeedback" onPress={this.selectAvatar}>
                        <Image style={styles.avatar} source={avatarSource} />
                    </IbatchPharmaButton>
                    <View>
                        <Text style={styles.userName}>{name}</Text>
                        <Text style={styles.account}>账号: {account}</Text>
                    </View>
                </View>
                <View>
                    <ListItem iconName="ip-of-mine" title="我的IP" text={ip} />
                    <ListItem iconName="post-switching" title="岗位" callback={this.gotoWorkCenter} text={work} />
                    <ListItem iconName="about-version" title="关于版本" text="v1.0.0" />
                </View>
                <View style={styles.fill} />
                <IbatchPharmaButton
                    style={styles.logoutBt}
                    textStyle={styles.logoutText}
                    text="注销"
                    touchableType="nativeFeedback"
                    onPress={this.logout}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    userArea: {
        marginTop: adaptation.setH(20),
        paddingLeft: adaptation.setW(30),
        height: adaptation.setH(190),
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    avatar: {
        marginTop: adaptation.setH(25),
        marginRight: adaptation.setW(31),
        height: adaptation.setH(130),
        width: adaptation.setW(130),
        borderRadius: adaptation.setW(10),
    },
    userName: {
        marginTop: adaptation.setH(52),
        fontSize: adaptation.setF(36),
        lineHeight: adaptation.setH(38),
        fontFamily: 'SourceHanSansK-Normal',
        fontWeight: 'bold',
        color: '#333',
    },
    account: {
        marginTop: adaptation.setH(22),
        fontSize: adaptation.setF(28),
        lineHeight: adaptation.setH(30),
        color: '#666',
        fontFamily: 'SourceHanSansK-Normal',
    },
    fill: {
        flex: 1,
    },
    logoutBt: {
        marginBottom: adaptation.setH(22),
        height: adaptation.setH(120),
        backgroundColor: 'white',
        borderRadius: 0,
    },
    logoutText: {
        fontSize: adaptation.setF(36),
        color: '#333',
        fontWeight: 'bold',
    },
});

const mapStateToProps = (state: InitialStateITF) => ({
    userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
    clearUserInfo: () => dispatch(actions.clearUserInfo()),
    updateUserInfo: (userInfo: UserInfo) => dispatch(actions.updataUserInfo(userInfo)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(User);
