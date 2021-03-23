/**
 * Title        ：网络请求错误处理脚本
 * Desc         ：处理后端返回错误代码
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/08
 */

import Toast from 'react-native-root-toast';
import Path from './path';
import axios from 'axios';
import store, { actions } from '~/store';
import AsyncStorage from '@react-native-community/async-storage';
// @ts-ignore
import CookieManager from 'react-native-cookie';
interface ErrData {
    apiId: number; // 接口id
    data: any; // 返回数据
    dataType: string; // 类型
    elapsed: number; // 接口调用时间
    errorCode: number; // 错误代码
    errorInfo: string | null; // 错误信息
    success: boolean; // 调用是否成功
    total: number; // list数据总数
}

export default class ErrCode {
    /**
     *@name 请求错误代码提示
     *@description 根据后端返回的错误代码，请求错误提示
     *@author jixianjing
     *@history 2020/05/08
     */
    private static getErrorInfo(errCode: number): Promise<any> {
        return axios.get(`${Path.errorCode.findErrorCode}`, {
            params: {
                code: errCode,
            },
        });
    }

    /**
     *@name 处理错误代码
     *@description 分别处理不同类型的错误代码
     *@author jixianjing
     *@history 2020/05/08
     */
    public static async showErrInfo(errorData: ErrData) {
        let { errorCode, errorInfo } = errorData;
        // 单点登录检查
        if (errorCode === 100000000) {
            // 清除本地缓存
            await AsyncStorage.clear();
            // 清除Cookie
            await CookieManager.clear(Path.BASE_URL);
            // 退出登录
            store.dispatch(actions.clearUserInfo());
        }
        // 密码过期
        // else if (errorCode === 219144801) {
        // }
        else {
            // 直接提示错误
            if (errorInfo) {
                Toast.show(`【${errorCode}】${errorInfo}`, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                });
            } else {
                let result = await ErrCode.getErrorInfo(errorCode);
                //@ts-ignore
                if (result.errorCode === 0) {
                    let msg = result.data ? result.data.description : '未找到该代码错误描述';
                    Toast.show(`${msg}`, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                    });
                }
            }
        }
    }
}
