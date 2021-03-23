/**
 * Title        ：http基本配置脚本
 * Desc         ：用于配置请求默认参数，拦截请求
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/19 by jixianjing
 */

import axios, { AxiosRequestConfig } from 'axios';
import Toast from 'react-native-root-toast';
import Loadding from '~/components/Loadding';
import ErrCode from './errCode';
import Path from './path';
export interface MesAxiosRequestConfig extends AxiosRequestConfig {
    errIgnore: boolean;
}

const Service = axios.create({
    timeout: 60000, // 请求超时时间
    baseURL: Path.BASE_URL,
    method: 'post',
    withCredentials: true,
    headers: {
        'User-Agent': 'mes-mobile',
    },
    validateStatus: function(status) {
        return status >= 200 && status < 300; // 默认的
    },
    // 代理
    // proxy: {
    //     host: 'http://192.168.100.88',
    //     port: 8096,
    // },
});

// 添加请求拦截器
Service.interceptors.request.use((config) => {
    return config;
});

// 添加响应拦截器
Service.interceptors.response.use(
    (response) => {
        let { data: result, config } = response;
        let { errIgnore, url } = config as MesAxiosRequestConfig;
        Loadding.hide();
        // 后端有返回值
        if (result) {
            let { errorCode } = result;
            // 未设置错误代码
            if (errorCode === undefined) {
                console.warn(`后端返回值未设置errorCode, url = ${url}`);
                return Promise.reject(result);
            }
            // 设置了错误代码
            else {
                // 处理错误代码
                if (errorCode && !errIgnore) {
                    ErrCode.showErrInfo(result);
                    return Promise.reject(result);
                }
                // 错误代码被忽略
                else {
                    return Promise.resolve(result);
                }
            }
        } else {
            Toast.show('服务器异常', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
            });
            return Promise.reject();
        }
    },
    (error) => {
        Loadding.hide();
        // 取消请求导致的报错
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
            // 网络错误404、500在此处处理
        } else {
            let msg = '';
            if (error.response) {
                let { status } = error.response;
                switch (status) {
                    case 404:
                        msg = `[${status}]路径未找到`;
                        break;
                    case 405:
                        msg = `[${status}]请求方式错误`;
                        break;
                    case 500:
                        msg = `[${status}]发生未知错误`;
                        break;
                    case 504:
                        msg = `[${status}]网关超时`;
                        break;
                    default:
                        msg = '请求超时';
                        break;
                }
            } else {
                if (error.code && error.code === 'ECONNABORTED') {
                    msg = '请求超时';
                } else {
                    msg = '网络错误，请检查你的网络是否连接';
                }
            }
            Toast.show(msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
            });
        }
        // 错误抛出到业务处
        return Promise.reject(error);
    },
);

export default Service;
