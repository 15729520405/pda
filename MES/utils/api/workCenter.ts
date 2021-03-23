/**
 * Title        ：岗位接口类
 * Desc         ：岗位相关的接口
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/04/30
 */

import Http, { UnifyResult } from '~/utils/http';
import axios, { CancelTokenStatic, CancelToken } from 'axios';
import Path from '~/utils/http/path';

// 岗位Dto
export interface WorkCenterDtoITF {
    aid: number;
    authDesc: string;
    authName: string;
    authNameDesc: string;
    byteUuId: string;
    cStandardFileUuid: string;
    code: string;
    dataPermissionCode: string;
    dataPermissionId: 0;
    dataPermissionName: string;
    desc: string;
    id: number;
    location: string;
    locationIn: string;
    locationOut: string;
    name: string;
    slIn: number;
    slInName: string;
    slOut: number;
    slOutName: string;
    standardFileCode: string;
    standardFileName: string;
    standardFileUuid: string;
    termCount: number;
    termId: number;
    typeId: number;
    typeName: string;
    uuid: string;
    valid: number;
    validName: string;
    wcgId: number;
    wcgName: string;
    workCenterType: number;
    workCenterTypeName: string;
}

// 查询岗位参数约束
interface QueryWorkCenterParam {
    valid: number;
    str: string;
}

// 查询岗位结果约束
export type QueryWorkCenterRes = UnifyResult<WorkCenterDtoITF[]>;

// 切花岗位参数约束
interface ChangeWorkCenterParam {
    wkcId: number;
}

export default class WorkCenterApi {
    // 取消请求令牌
    public static CancelTokenObj: CancelTokenStatic = axios.CancelToken;

    // 查询岗位
    public static queryWorkCenter(data: QueryWorkCenterParam, cancelToken?: CancelToken): Promise<QueryWorkCenterRes> {
        return Http.get({
            url: `${Path.workCenter.queryWkcByStr}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
        });
    }

    // 切换岗位
    public static changeWorkCenter(
        data: ChangeWorkCenterParam,
        cancelToken?: CancelToken,
    ): Promise<UnifyResult<number>> {
        return Http.put({
            url: `${Path.workCenter.changWorkId}`,
            data: data,
            cancelToken: cancelToken,
            traditional: true,
            isLoadding: true,
        });
    }
}
