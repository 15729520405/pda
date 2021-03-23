/**
 * Title        ：地址相关接口类
 * Desc         ：与地址相关的一切接口
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/06/19
 */

import Http, { UnifyResult } from '~/utils/http';
import axios, { CancelTokenStatic, CancelToken } from 'axios';
import Path from '~/utils/http/path';

export default class LocationApi {
    // 取消请求令牌
    public static CancelTokenObj: CancelTokenStatic = axios.CancelToken;

    // 查询位置
    public static queryLocation(cancelToken?: CancelToken): Promise<UnifyResult<any>> {
        return Http.get({
            url: `${Path.location.self}`,
            data: {},
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
        });
    }
}
