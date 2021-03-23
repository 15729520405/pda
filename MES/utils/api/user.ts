/**
 * Title        ：用户模块接口类
 * Desc         ：用于用户登录、注销
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/04/30
 */
import Http, { UnifyResult } from '~/utils/http';
import axios, { CancelTokenStatic, CancelToken } from 'axios';
import Path from '~/utils/http/path';

interface LoginParam {
    account: string;
    password: string;
}

export default class UserApi {
    // 取消请求令牌
    public static CancelTokenObj: CancelTokenStatic = axios.CancelToken;

    /**
     *@name 用户登录
     *@description 用户登录
     *@author jixianjing
     *@history 2020/04/30
     */
    public static login(data: LoginParam, cancelToken?: CancelToken): Promise<UnifyResult<any>> {
        return Http.post({
            url: `${Path.login.login}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
            // errIgnore: true,
        });
    }

    /**
     *@name 用户注销
     *@description 用户注销
     *@author jixianjing
     *@history 2020/04/30
     */
    public static loginOut(cancelToken?: CancelToken): Promise<UnifyResult<any>> {
        return Http.post({
            url: `${Path.CheckLockTimeAPI.shshutdown}`,
            data: '',
            cancelToken: cancelToken,
        });
    }
}
