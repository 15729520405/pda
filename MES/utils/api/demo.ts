/**
 * Title        ：demo
 * Desc         ：用于展示接口类写法
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/24
 */

import Http, { File, UnifyResult } from '~/utils/http';
import axios, { CancelTokenStatic, CancelToken } from 'axios';
import RNFS from 'react-native-fs';
export default class Adb {
    public static CancelTokenObj: CancelTokenStatic = axios.CancelToken;
    public static requesta(url: string, data: any, cancelToken?: CancelToken) {
        return Http.get({
            url: url,
            data: data,
            cancelToken: cancelToken,
        });
    }
    public static requestb(url: string, data: any, cancelToken?: CancelToken): Promise<UnifyResult<any>> {
        return Http.get({
            url: url,
            data: data,
            traditional: true,
            cancelToken: cancelToken,
        });
    }

    public static upload(url: string, files: File[]): Promise<any> {
        return Http.upLoadFile({
            url: url,
            files: files,
        });
    }

    public static upload1(url: string, files: any[]): Promise<any> {
        return RNFS.uploadFiles({
            toUrl: 'https://localhost:3000/' + url,
            files: files,
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            fields: {
                hello: 'world',
            },
        }).promise;
    }
}
// const source = Adb.CancelTokenObj.source();
// // Adb.requesta('1',{},source.token);
// // source.cancel('终止操作');
