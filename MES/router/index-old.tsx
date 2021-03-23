/**
 * Title        ：路由管理脚本
 * Desc         ：配置与管理路由（后期可结合权限使用）
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/05 by jixianjing
 */
import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// @ts-ignore
import CookieManager from 'react-native-cookie';
// 导航相关
import { NavigationSwitchProp, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
// 页面
import Login from '~/page/Login';
import Instruction from '~/page/Instruction';
import Pharma from '~/page/Pharma';
import User from '~/page/User';
import Demo from '~/page/Demo';
// 组件
import Icon from 'react-native-vector-icons/FontAwesome';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import CustomLabel from './components/customLabel'; // 自定义Label
import MesIcon from '~/components/Icons'; // Mes系统图标
import Path from '~/utils/http/path';
const adaptation = new Adaptation();

type Props = {
    navigation: NavigationSwitchProp<any>;
};

// 重定向（可在此处注入全局推送）
class Redirect extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.bootstrapAsync();
    }

    private bootstrapAsync = async () => {
        let userInfo = await CookieManager.get(Path);
        // if(!userInfo) {
        //   // 清除所有Cookie
        //   CookieManager.clearAll();
        //   // 清除所有本地缓存
        //   AsyncStorage.clear();
        // }

        this.props.navigation.navigate(userInfo ? 'Home' : 'Login');
    };

    render() {
        return (
            <View style={styles.container}>
                {/* 可以再此处写开机页面 */}
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// icon尺寸
const iconSize = adaptation.setH(48);
//tab式导航
const Home = createBottomTabNavigator(
    {
        Instruction: {
            screen: Instruction,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: ({ focused, tintColor }: any) => {
                    return <CustomLabel focused={focused} title="指令" color={tintColor} />;
                },
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    if (!focused) {
                        tintColor = '#666';
                    }
                    // return <Icon name={'wpforms'} size={iconSize} color={tintColor} />
                    return <MesIcon name={'zhiling'} size={iconSize} color={tintColor} />;
                },
            }),
        },
        Pharma: {
            screen: Pharma,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: ({ focused, tintColor }: any) => {
                    return <CustomLabel focused={focused} title="Pharma" color={tintColor} />;
                },
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    if (!focused) {
                        tintColor = '#666';
                    }
                    return <MesIcon name={'Phama'} size={iconSize} color={tintColor} />;
                },
            }),
        },
        User: {
            screen: User,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: ({ focused, tintColor }: any) => {
                    return <CustomLabel focused={focused} title="我的" color={tintColor} />;
                },
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    if (!focused) {
                        tintColor = '#666';
                    }
                    return <MesIcon name={'wode'} size={iconSize} color={tintColor} />;
                },
            }),
        },
    },
    {
        initialRouteName: 'Instruction',
        tabBarOptions: {
            activeTintColor: 'green',
            inactiveTintColor: '#333',
            // activeBackgroundColor: 'blue',
            // inactiveBackgroundColor: 'white',
            showIcon: true,
            // showLabel: false,
            // labelPosition: 'below-icon',
            style: {
                backgroundColor: '#fff',
                height: adaptation.setH(100),
                borderTopWidth: 0,
                // alignItems: 'center',
            },
            // labelStyle:  {
            //   fontFamily: 'SourceHanSansK-Normal',
            //   fontSize: adaptation.setF(26)
            // }
        },
    },
);
/**
 * switch式导肮
 * createSwitchNavigator没有标题的
 */
export default createAppContainer(
    createSwitchNavigator(
        {
            Redirect: Redirect,
            Login: Login,
            Home: Home,
        },
        {
            initialRouteName: 'Redirect',
        },
    ),
);
