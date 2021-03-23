/**
 * Title        ：登录页
 * Desc         ：用户登录
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/03/15
 */

import React from 'react';
import { StatusBar, StyleSheet, Text, Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginScreenProps } from '~/router';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import IbatchPharmaInput from '~/components/IbatchPharmaInput';
import Toast from 'react-native-root-toast';
import UserApi from '~/utils/api/user';
import RnDevice from 'react-native-device-info';
import { connect } from 'react-redux';
import { actions, UserInfo } from '~/store';
// @ts-ignore
import CookieManager from 'react-native-cookie';
import Path from '~/utils/http/path';
const adaptation = new Adaptation();

const logoUrl = require('~/assets/images/logo.png');

interface LoginState {
    selectInput: number;
}

interface Props extends LoginScreenProps {
    updateUserInfo: (userInfo: UserInfo) => void;
}

class Login extends React.PureComponent<Props, LoginState> {
    private pwd: string = '';
    private userName: string = '';
    public constructor(props: Props) {
        super(props);
        this.state = {
            selectInput: -1,
        };
    }

    // 登录
    private login = async () => {
        let { pwd, userName } = this;
        let { updateUserInfo } = this.props;
        if (userName === '') {
            Toast.show('请输入用户名', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
            });
            return;
        } else if (pwd === '') {
            Toast.show('请输入密码', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
            });
            return;
        } else {
            let param = {
                account: userName,
                password: pwd,
            };
            let result = await UserApi.login(param);
            let ip = await RnDevice.getIpAddress();
            let { account, id, name, terminal } = result.data;

            // 测试 ↓
            // let userInfo = {
            //     account,
            //     name,
            //     userId: id,
            //     workCenterId: '1',
            //     wkcCode: 2,
            //     wkcName: 'asd',
            //     ip,
            //     avatar: '',
            // };
            // await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            // updateUserInfo(userInfo);
            // return;
            // 测试 ↑

            // 有终端信息
            if (terminal) {
                let { wkcCode, wkcName, workCenterId } = terminal;
                let userInfo = {
                    account,
                    name,
                    userId: id,
                    workCenterId,
                    wkcCode,
                    wkcName,
                    ip,
                    avatar: '',
                };
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                updateUserInfo(userInfo);
            } else {
                // 清除本地缓存
                AsyncStorage.clear();
                // 删除Cookie
                CookieManager.clear(Path.BASE_URL);
                console.log(await CookieManager.get(Path.BASE_URL));
                Toast.show(`未配置终端信息，请在管理终端配置，本机ip：${ip}`, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                });
            }
        }
    };

    public render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.logo} resizeMode="contain" source={logoUrl} />
                </View>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>宝驰信制药生产执行系统</Text>
                    <Text style={[styles.title, styles.titileBottom]}>iBATCH PHARMA</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.formRow}>
                        <Text style={this.state.selectInput === 0 ? styles.formTextActive : styles.formTextNormal}>
                            用户名：
                        </Text>
                        <IbatchPharmaInput
                            inputType="text"
                            style={styles.input}
                            getOutput={(text) => (this.userName = text)}
                            isFill={true}
                            onFocus={() => {
                                this.setState({
                                    selectInput: 0,
                                });
                            }}
                            onBlur={() => {
                                this.setState({
                                    selectInput: -1,
                                });
                            }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={this.state.selectInput === 1 ? styles.formTextActive : styles.formTextNormal}>
                            密&nbsp;&nbsp;&nbsp;&nbsp;码：
                        </Text>
                        <IbatchPharmaInput
                            inputType="pwd"
                            style={styles.input}
                            getOutput={(text) => (this.pwd = text)}
                            isFill={true}
                            onFocus={() => {
                                this.setState({
                                    selectInput: 1,
                                });
                            }}
                            onBlur={() => {
                                this.setState({
                                    selectInput: -1,
                                });
                            }}
                        />
                    </View>
                </View>
                <IbatchPharmaButton
                    style={styles.loginBt}
                    textStyle={styles.loginText}
                    text="登录"
                    touchableType="nativeFeedback"
                    onPress={this.login}
                />
                <View style={{ flex: 1 }} />
                <View>
                    <Text style={styles.version}>版本号: v1.0.0</Text>
                </View>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logo: {
        marginTop: adaptation.setH(60),
        width: adaptation.setW(600),
        height: adaptation.setH(70),
    },
    titleBox: {
        marginTop: adaptation.setH(110),
    },
    title: {
        fontFamily: 'SourceHanSansK-Normal',
        textAlign: 'center',
        fontSize: adaptation.setF(46),
        lineHeight: adaptation.setH(46),
        color: '#666',
        letterSpacing: 1,
    },
    titileBottom: {
        marginTop: adaptation.setH(30),
        lineHeight: adaptation.setH(44),
        fontFamily: 'Arial-Narrow',
    },
    form: {
        marginTop: adaptation.setH(30),
    },
    formRow: {
        marginTop: adaptation.setH(40),
        paddingLeft: adaptation.setW(40),
        width: adaptation.setW(640),
        height: adaptation.setH(100),
        backgroundColor: '#f7f7f7',
        borderRadius: adaptation.setW(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    formTextActive: {
        width: adaptation.setW(142),
        color: '#666',
        fontSize: adaptation.setF(34),
    },
    formTextNormal: {
        width: adaptation.setW(142),
        color: '#999',
        fontSize: adaptation.setF(34),
    },
    input: {
        flex: 1,
        textAlign: 'left',
    },
    loginBt: {
        marginTop: adaptation.setH(100),
        height: adaptation.setH(130),
        width: adaptation.setW(640),
    },
    loginText: {
        fontSize: adaptation.setF(60),
        fontWeight: 'bold',
    },
    version: {
        marginBottom: adaptation.setH(30),
        lineHeight: adaptation.setH(24),
        fontFamily: 'SourceHanSansK-Normal',
        fontSize: adaptation.setF(24),
        textAlign: 'center',
        color: '#666',
    },
});

const mapDispatchToProps = (dispatch: any) => ({
    updateUserInfo: (userInfo: UserInfo) => dispatch(actions.updataUserInfo(userInfo)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Login);
