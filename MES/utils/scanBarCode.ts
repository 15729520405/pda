/**
 * Title        ：扫描组件（RN调用原生组件）
 * Desc         ：调用PDA提供接口，封装成RN可使用的组件，详细JAVA代码请参阅CustionScanBarCodePackage.java、ScanBarCode.java
 * Copyright    : Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/23 by jixianjing
 */
import { NativeModules, NativeEventEmitter, EventSubscriptionVendor } from 'react-native';

// 对象方法约束
interface ScanBarCodeITF extends EventSubscriptionVendor {
    init: () => void; // 初始化扫描服务
    starScan: () => void; // 开始扫描
    stopScan: () => void; // 停止扫描
    listenerScan: (callback: (event: any) => void) => void; // 监听扫描
}

// 扫描模块
const ScanBarCode: ScanBarCodeITF = NativeModules.ScanBarCode;
ScanBarCode.listenerScan = function(callback) {
    const eventEmitter = new NativeEventEmitter(ScanBarCode);
    eventEmitter.addListener('getBarCode', (event) => {
        callback(event);
    });
};
export default ScanBarCode;
