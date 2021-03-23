/**
 * Title        ：扫描相关接口类
 * Desc         ：与扫描相关的一切接口
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/07
 */

import Http, { UnifyResult } from '~/utils/http';
import axios, { CancelTokenStatic, CancelToken } from 'axios';
import Path from '~/utils/http/path';

// 识别条码参数约束
interface scanMaterialPartsParam {
    tuNo: string; // 物料件号
    barCode: string; // 条码
    flag: boolean; // true： barCode false: tuNo
}

// 物料移库参数约束
interface MoveBoundMaterialParam {
    sid: string; // 签名id
    tuUuidList: string[]; // 物料件uuidList
    targetLocation: string; // 目标位置
}

// 物料出库参数约束
interface OutBoundMaterialParam {
    sid: string; // 签名id
    tuUuidList: string[]; // 物料件uuidList
    reason: string; // 理由
    description: string; // 描述
}

export default class scanApi {
    // 取消请求令牌
    public static CancelTokenObj: CancelTokenStatic = axios.CancelToken;

    // 扫描物料件
    public static scanMaterialParts(
        data: scanMaterialPartsParam,
        cancelToken?: CancelToken,
    ): Promise<UnifyResult<any>> {
        return Http.get({
            url: `${Path.tradeUnit.scan}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
        });
    }

    // 物料移库
    public static moveBoundMaterial(
        data: MoveBoundMaterialParam,
        cancelToken?: CancelToken,
    ): Promise<UnifyResult<any>> {
        return Http.put({
            url: `${Path.tradeUnit.move}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
        });
    }

    // 物料出库
    public static outBoundMaterial(data: OutBoundMaterialParam, cancelToken?: CancelToken): Promise<UnifyResult<any>> {
        return Http.put({
            url: `${Path.tradeUnit.cancelStock}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
        });
    }
}
