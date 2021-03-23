/**
 * Title        ：页面路由脚本
 * Desc         ：路由脚本本身才是应用的根
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/24
 */

import React from 'react';
import { NavigationContainer, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { InitialStateITF } from '~/store';
// 页面
import LoginScreen from '~/page/Login';
import InstructionScreen from '~/page/Instruction';
import PharmaScreen from '~/page/Pharma';
import UserScreen from '~/page/User';
import DemoScreen from '~/page/Demo';
import OpenAnimateScreen from '~/page/OpenAnimate';
import QueryDetailScreen from '~/page/QueryDetail';
import MoveBoundDetailScreen from '~/page/MoveBoundDetail';
import OutBoundDetailScreen from '~/page/OutBoundDetail';
import WorkCenterChangeScreen from '~/page/workCenterChange';
import ScanScreen from '~/page/Scan';
// 组件
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import CustomLabel from './components/customLabel'; // 自定义Label
import CustomLeftButton from './components/customLeftButton'; // 自定义返回按钮
import MesIcon from '~/components/Icons'; // Mes系统图标
const adaptation = new Adaptation();

// 主路由页面传参参数约束
type RootStackParamList = {
    Home: undefined;
    LoginScreen: undefined;
    ScanScreen: {
        screenInfo: { type: 0; name: '查询' } | { type: 1; name: '移库' } | { type: 2; name: '出库' };
    };
    QueryDetailScreen: { detailInfo: any };
    MoveBoundDetailScreen: { detailInfo: any; callback: (location: string) => void };
    OutBoundDetailScreen: { detailInfo: any; isComplete?: boolean; callback: () => void };
    WorkCenterChangeScreen: undefined;
};
// Tab页面传参参数约束
type TabBarParamList = {
    InstructionScreen: undefined;
    PharmaScreen: undefined;
    UserScreen: undefined;
};

// 登录页属性约束
export interface LoginScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
    route: RouteProp<RootStackParamList, 'LoginScreen'>;
}

// Home（容器）属性约束
export interface HomeProps {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
    route: RouteProp<RootStackParamList, 'Home'>;
}

export interface ScanScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'ScanScreen'>;
    route: RouteProp<RootStackParamList, 'ScanScreen'>;
}

// QueryDetail页属性约束
export interface QueryDetailScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'QueryDetailScreen'>;
    route: RouteProp<RootStackParamList, 'QueryDetailScreen'>;
}

// MoveBoundDetail页属性约束
export interface MoveBoundDetailScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'MoveBoundDetailScreen'>;
    route: RouteProp<RootStackParamList, 'MoveBoundDetailScreen'>;
}

// OutBoundDetail页属性约束
export interface OutBoundDetailScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'OutBoundDetailScreen'>;
    route: RouteProp<RootStackParamList, 'OutBoundDetailScreen'>;
}

// WorkCenterChange页属性约束
export interface WorkCenterChangeScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'WorkCenterChangeScreen'>;
    route: RouteProp<RootStackParamList, 'WorkCenterChangeScreen'>;
}
// Instruction页参数约束
type InstructionScreenNavigationProps = CompositeNavigationProp<
    BottomTabNavigationProp<TabBarParamList, 'InstructionScreen'>,
    StackNavigationProp<RootStackParamList>
>;

// Instruction页属性约束
export interface InstructionScreenProps {
    navigation: InstructionScreenNavigationProps;
    route: RouteProp<TabBarParamList, 'InstructionScreen'>;
}

// Pharma页导航属性参数约束
type PharmaNavigationProps = CompositeNavigationProp<
    BottomTabNavigationProp<TabBarParamList, 'PharmaScreen'>,
    StackNavigationProp<RootStackParamList>
>;

// Pharma页属性约束
export interface PharmaScreenProps {
    navigation: PharmaNavigationProps;
    route: RouteProp<TabBarParamList, 'PharmaScreen'>;
}

// User页导航属性参数约束
type UserNavigationProps = CompositeNavigationProp<
    BottomTabNavigationProp<TabBarParamList, 'UserScreen'>,
    StackNavigationProp<RootStackParamList>
>;

// User页属性约束
export interface UserScreenProps {
    navigation: UserNavigationProps;
    route: RouteProp<TabBarParamList, 'UserScreen'>;
}

const RootStack = createStackNavigator<RootStackParamList>();
const HomeTabBar = createBottomTabNavigator<TabBarParamList>();

// Home 容器
function Home({ route: homeRoute, navigation }: HomeProps) {
    return (
        <HomeTabBar.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused, color }: any) => {
                    let title = '';
                    switch (route.name) {
                        case 'InstructionScreen':
                            title = '指令';
                            break;
                        case 'PharmaScreen':
                            title = 'Pharma';
                            break;
                        case 'UserScreen':
                            title = '我的';
                            break;
                        default:
                            title = '我的';
                            break;
                    }
                    return <CustomLabel focused={focused} title={title} color={color} />;
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    switch (route.name) {
                        case 'InstructionScreen':
                            iconName = 'order';
                            break;
                        case 'PharmaScreen':
                            iconName = 'Phama';
                            break;
                        case 'UserScreen':
                            iconName = 'about-me';
                            break;
                        default:
                            iconName = 'wode';
                            break;
                    }
                    if (!focused) {
                        color = '#666';
                    }
                    return <MesIcon name={iconName} size={adaptation.setH(48)} color={color} />;
                },
            })}
            tabBarOptions={{
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
                //   fontSize: adaptation.setF(26),
                //   backgroundColor: 'red'
                // }
            }}>
            <HomeTabBar.Screen name="InstructionScreen" component={InstructionScreen} />
            <HomeTabBar.Screen name="PharmaScreen" component={PharmaScreen} />
            <HomeTabBar.Screen name="UserScreen" component={UserScreen} />
        </HomeTabBar.Navigator>
    );
}

// 根组件
class Router extends React.PureComponent<any> {
    render() {
        let { userInfo, isLoading } = this.props;
        if (isLoading) {
            return <OpenAnimateScreen />;
        }
        return (
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{
                        headerShown: true,
                        // 导航栏样式
                        headerStyle: {
                            height: adaptation.setH(88),
                        },
                        // 标题容器样式
                        headerTitleContainerStyle: {
                            left: adaptation.setW(60),
                        },
                        // 标题内容样式
                        headerTitleStyle: {
                            fontSize: adaptation.setF(36),
                            color: '#333',
                            fontWeight: 'bold',
                            fontFamily: 'SourceHanSansK-Normal',
                        },
                        // 左侧按钮容器样式
                        headerLeftContainerStyle: {},
                        headerLeft: (props) => {
                            return <CustomLeftButton {...props} />;
                        },
                    }}>
                    {userInfo === null ? (
                        <>
                            <RootStack.Screen
                                name="LoginScreen"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                        </>
                    ) : (
                        <>
                            <RootStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                            <RootStack.Screen
                                name="ScanScreen"
                                component={ScanScreen}
                                options={({ route }) => ({ headerTitle: route.params.screenInfo.name })}
                            />
                            <RootStack.Screen
                                name="QueryDetailScreen"
                                component={QueryDetailScreen}
                                options={{ headerTitle: '详情' }}
                            />
                            <RootStack.Screen
                                name="MoveBoundDetailScreen"
                                component={MoveBoundDetailScreen}
                                options={{ headerTitle: '移库' }}
                            />
                            <RootStack.Screen
                                name="OutBoundDetailScreen"
                                component={OutBoundDetailScreen}
                                options={{ headerTitle: '出库' }}
                            />
                            <RootStack.Screen
                                name="WorkCenterChangeScreen"
                                component={WorkCenterChangeScreen}
                                options={{ headerTitle: '岗位切换' }}
                            />
                        </>
                    )}
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state: InitialStateITF) => ({
    userInfo: state.userInfo,
    isLoading: state.isLoading,
});

export default connect(mapStateToProps)(Router);
