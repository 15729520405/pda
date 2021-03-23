/**
 * Title        ：网络请求地址
 * Desc         ：统一管理所有网络地址
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/15
 */
let BASE_URL = 'http://10.61.9.11/'
// 映射03
// let BASE_URL = 'http://192.168.100.88:8096/';
declare let GLOBAL: any;

// if (GLOBAL.process.env.NODE_ENV !== "development") {
//     // 映射04
//     BASE_URL = 'http://192.168.100.88:8097/'
// }

export default class Path {
    public static BASE_URL = BASE_URL;
    public static backPathV1 = 'api/v1/';
    public static backPathV2 = 'api/v2/';
    public static backPathV3 = 'api/v3/';

    public static login = {
        login: `${Path.backPathV1}login/login`,
    };

    public static CheckLockTimeAPI = {
        shshutdown: `${Path.backPathV2}CheckLockTimeAPI/shshutdown`,
    };

    public static errorCode = {
        findErrorCode: `${Path.backPathV1}errorCode/findErrorCode`,
    };

    public static 'batch-orders' = {
        'batch-orders-info': `${Path.backPathV3}batch-orders-info`,
    };

    public static workCenterOrder = {
        findWorkCenterOrder: `${Path.backPathV1}workCenterOrder/findWorkCenterOrder`,
        'mobile/findWorkCenterOrder': `${Path.backPathV1}workCenterOrder/mobile/findWorkCenterOrder`,
    };

    public static tradeUnit = {
        scan: `${Path.backPathV2}tradeUnit/scan`,
        move: `${Path.backPathV2}tradeUnit/move`,
        cancelStock: `${Path.backPathV2}tradeUnit/cancelStock`,
    };

    public static workCenter = {
        queryWkcByStr: `${Path.backPathV1}workCenter/queryWkcByStr`,
        changWorkId: `${Path.backPathV1}workCenter/changWorkId`,
    };

    public static location = {
        self: `${Path.backPathV3}location`,
    };
}
