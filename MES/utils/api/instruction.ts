/**
 * Title        ：指令接口类
 * Desc         ：与指令相关的一切接口
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/07
 */
import Http, { UnifyResult } from '~/utils/http';
import axios, { CancelTokenStatic, CancelToken } from 'axios';
import Path from '~/utils/http/path';

interface queryWorkCenterOrderParam {
    work_center_id: number;
    user_id: number;
}

export default class OrderApi {
    // 取消请求令牌
    public static CancelTokenObj: CancelTokenStatic = axios.CancelToken;

    /**
     *@name 获取所有批指令
     *@description 用户登录
     *@author jixianjing
     *@history 2020/04/30
     */
    public static queryAllInstruction(data: any, cancelToken?: CancelToken): Promise<UnifyResult<any[]>> {
        return Http.get({
            url: `${Path['batch-orders']['batch-orders-info']}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
        });
    }

    /**
     *@name 获取某一岗位下的指令
     *@description 用户登录
     *@author jixianjing
     *@history 2020/04/30
     */
    public static queryWorkCenterOrder(
        data: queryWorkCenterOrderParam,
        cancelToken?: CancelToken,
    ): Promise<UnifyResult<any[]>> {
        return Http.get({
            url: `${Path.workCenterOrder['mobile/findWorkCenterOrder']}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
        });
    }
}
