/**
 * Title        ：MES 权限请求组件
 * Desc         ：统一封装权限获取逻辑（获取成功、获取失败、永久性拒接）
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 20200420
 */
import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import {
    check,
    request,
    Permission,
    PERMISSIONS,
    RESULTS,
    openSettings,
    checkMultiple,
    requestMultiple,
    checkNotifications,
    requestNotifications,
    NotificationOption,
} from 'react-native-permissions';
interface Opt {
    permissions: Permission;
    blockedTitle: string;
    successCallBack: () => void;
}

/**
 *@name Mes 权限请求组件
 *@description 单个权限，多个权限
 *@author jixianjing
 */
export default class IbatchPharmaPermissions {
    public static PERMISSIONS = PERMISSIONS; // 权限常量对象

    /**
     *@name 获取单个权限
     *@description 请求单个权限
     *@author jixianjing
     *@history 2020/04/20
     */
    public static async getPermissions(opt: Opt) {
        let { permissions, blockedTitle, successCallBack } = opt;
        let result = await check(permissions);
        switch (result) {
            // 不支持该功能
            case RESULTS.UNAVAILABLE:
                Alert.alert('', '您的设备不支持该功能', [{ text: '确定' }]);
                break;
            // 该权限尚未被请求、被拒绝，但可请求
            case RESULTS.DENIED:
                let req = await request(permissions);
                // 已拒绝
                if (req == RESULTS.DENIED) {
                    let toast = Toast.show('您已拒绝获取权限', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }
                break;
            // 授予权限
            case RESULTS.GRANTED:
                typeof successCallBack === 'function' && successCallBack();
                break;
            // 永久性被拒绝，只能通过设置开启
            case RESULTS.BLOCKED:
                Alert.alert('提示', blockedTitle, [
                    {
                        text: '关闭',
                    },
                    {
                        text: '去设置开启权限',
                        onPress: () => {
                            openSettings();
                        },
                    },
                ]);
                break;
        }
    }

    /**
     *@name 获取多个权限
     *@description 请求多个权限,如果某一权限被拒绝，在使用该权限时，再单独去获取
     *@author jixianjing
     *@history 2020/04/21
     */
    public static async getMultiplePermissions(
        permissionsArr: Permission[],
        callBack?: (grantedPermissionsArr: Permission[]) => void,
    ) {
        let status = await checkMultiple(permissionsArr);
        let requsetPermissionsArr: Permission[] = []; // 需要被请求的权限数组
        let grantedPermissionsArr: Permission[] = []; // 被同意的权限数组
        // 获取尚未被请求、被拒绝，但可请求的权限
        for (let key in status) {
            status[key as Permission] !== RESULTS.DENIED && requsetPermissionsArr.push(key as Permission);
        }
        let requsetStatus = await requestMultiple(requsetPermissionsArr);
        // 批量请求权限,获取已被授权的权限
        for (let key in requsetStatus) {
            status[key as Permission] === RESULTS.GRANTED && grantedPermissionsArr.push(key as Permission);
        }
        typeof callBack === 'function' && callBack(grantedPermissionsArr);
    }

    /**
     *@name 获取通知的权限
     *@description 获取通知的权限，通知权限不属于android权限，不需要在列表中配置,options 仅在系统为IOS时有效
     *@author jixianjing
     *@history 2020/04/21
     */
    public static async getNotifications(options: NotificationOption[] = [], callBack?: () => void) {
        let { status, settings: checkSettings } = await checkNotifications();
        let flag = false;
        let len = options.length;
        // 是否阻止所有常规的通知
        if (status === 'blocked') {
            Alert.alert('提示', '请允许应用通知', [
                {
                    text: '关闭',
                },
                {
                    text: '去设置开启权限',
                    onPress: () => {
                        openSettings();
                    },
                },
            ]);
        } else {
            // 用户不需要其他类型的通知
            if (len === 0) {
                flag = true;
            }
            // 用户需要其他类型的通知
            else {
                // 该android版本不支持设置
                if (Object.keys(checkSettings).length === 0) {
                    Toast.show('您的手机版本暂时不支持本项功能，请升级版本', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        onShow: () => {
                            // calls on toast\`s appear animation start
                        },
                        onShown: () => {
                            // calls on toast\`s appear animation end.
                        },
                        onHide: () => {
                            // calls on toast\`s hide animation start.
                        },
                        onHidden: () => {
                            // calls on toast\`s hide animation end.
                        },
                    });
                    return;
                } else {
                    // 满足了用户需要的权限《代码未完善》
                    if (checkSettings) {
                        flag = true;
                    }
                    // 未满足《代码未完善》
                    else {
                        let { status, settings: reqSettings } = await requestNotifications(options);
                        for (let key in reqSettings) {
                            //@ts-ignore
                            console.log(key, reqSettings[key]);
                        }
                    }
                }
            }
        }
        flag && typeof callBack === 'function' && callBack();
    }
}
