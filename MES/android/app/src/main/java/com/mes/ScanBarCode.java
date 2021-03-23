/**
 * Title        ：扫描条码二维码
 * Desc         ：封装PDA厂家提供的接口，调用扫描枪扫描条码二维码，暴露给RN 使用
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/28
*/
package com.mes;
// 扫描相关包
import com.scandecode.ScanDecode;
import com.scandecode.inf.ScanInterface;
// react-native相关包
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
// 发送事件相关包
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import androidx.annotation.Nullable;
// 参数暴露相关包
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Promise;
// 参数暴露相关包
import java.util.Map;
import java.util.HashMap;


public class ScanBarCode extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static ScanInterface scanDecode;
    
    // 构造方法
    public ScanBarCode(ReactApplicationContext context) {
      super(context);
      reactContext = context;
      scanDecode = new ScanDecode(context);
    }

    // 定义引用模块的名字
    @Override
    public String getName() {
      return "ScanBarCode";
    }
    

     // 定义需要暴露给js的变量
     @Override
     public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
       // constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
       // constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
       return constants;
     }

    // 发送事件
    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
    reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
    }

    // 初始化(暴露给js的方法)
    @ReactMethod
    public void init() {
      // 初始化扫描服务
      scanDecode.initService("true");

      // 获取扫描数据
      scanDecode.getBarCode(new ScanInterface.OnScanListener() {
        @Override
        public void getBarcode(String data) {
          // 发送事件
          WritableMap params = Arguments.createMap();
          params.putString("barCode", data);
          // js监听getBarCode
          sendEvent(reactContext, "getBarCode", params);
        }
        @Override
        public void getBarcodeByte(byte[] bytes) {

        }
    });
    }

    // 开始扫描(暴露给js的方法)
    @ReactMethod
    public void starScan() {
      scanDecode.starScan();
    }

    // 停止扫描(暴露给js的方法)
    @ReactMethod
    public void stopScan() {
      scanDecode.stopScan();
    }

    //获取扫描数据(暴露给js的方法)
    @ReactMethod
    public void getScanData(Promise promise) {
      
      scanDecode.getBarCode(new ScanInterface.OnScanListener() {
          @Override
          public void getBarcode(String data) {
            try {
              promise.resolve(data);
            } catch (IllegalViewOperationException e) {
              promise.reject(e);
            }
          }
          @Override
          public void getBarcodeByte(byte[] bytes) {
   
          }
      });
    }
  }