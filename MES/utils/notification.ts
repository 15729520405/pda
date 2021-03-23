/**
 * Title        ：通知推送脚本（暂不支持远程推送）
 * Desc         ：主要用于发送本地通知，通知主要分两种: 本地通知（需要App存在于进程中）、远程通知（借助厂商或goole的服务器发起的通知，App无需存在于进程中）
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/04/24
 */
//@ts-ignore
import PushNotification from 'react-native-push-notification';

// 回调参数约束
type Callback = (notification: any) => void;

// 本地推送方法参数约束
interface localNotificationOpt {
    title: string; // 标题
    message: string; // 信息
    bigText?: string; // 仅在通知展开时显示，替换掉message
    subText?: string; // 子信息
    callback?: Callback; // 通知被触发的回调
    time?: number; // 通知距离当前时间多久触发单位毫秒
}

interface localNotificationSchedule {}

// 方法注册中心类型约束
interface FuncCenter {
    [x: string]: Callback;
}
/**
 *@name 消息推送类
 *@description 推送本地消息，处理消息回调
 *@author jixianjing
 */
class Notification {
    public static funcCenter: FuncCenter = {}; // 方法注册中心

    /**
     *@name 初始化通知推送服务
     *@description 初始化通知推送服务
     *@author jixianjing
     *@history 2020/04/24
     */
    public static init() {
        PushNotification.configure({
            // 推送注册时的回调
            onRegister: function(token: any) {
                console.log('TOKEN:', token);
            },
            // 通知被点击时的回调
            onNotification: function(notification: any) {
                let { id } = notification;
                typeof Notification.funcCenter[id] === 'function' && Notification.funcCenter[id](notification);
                // 删除本条注册内容
                delete Notification.funcCenter[id];
            },

            // ANDROID ONLY: (optional) GCM Sender ID.
            senderID: 'YOUR GCM SENDER ID',

            // 只有IOS拥有
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // 应该自动弹出初始通知
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            // 是否要请求权限
            requestPermissions: true,
        });
    }

    /**
     *@name 本地通知
     *@description 本地通知
     *@author jixianjing
     *@history 2020/04/24
     */
    public static localNotification(opt: localNotificationOpt) {
        let { title, message, bigText, subText, callback, time } = opt;
        let id = Math.random();
        typeof callback === 'function' && this.registerEvent(id, callback);
        let config: any = {
            /* Android Only Properties */
            id: id, // id默认自动增长
            ticker: 'My Notification Ticker', // 票据(也没啥用)
            autoCancel: true, // 自动关闭
            largeIcon: 'ic_launcher', // 大图标
            smallIcon: 'ic_launcher', // 小图标
            color: 'black', // 小标签颜色
            vibrate: true, // 振动
            vibration: 300, // 振动时长(ms)
            tag: 'some_tag', // 暂时不知道有啥用
            group: '222', // 暂时不知道有啥用
            ongoing: false, // 暂时不知道有啥用

            /* 只用IOS才拥有 */
            alertAction: null,
            category: null,
            userInfo: null,

            title, // 标题
            message, // 信息
            bigText, // 仅在通知展开时显示，替换掉message
            subText, // 子信息
            playSound: false, // 是否发出提示音
            number: 100, // 暂时不知道有啥用（推测是声音的时长）
        };
        if (time) {
            config.date = new Date(Date.now() + time);
            PushNotification.localNotificationSchedule(config);
        } else {
            PushNotification.localNotification(config);
        }
    }

    /**
     *@name 本地通知回调注册
     *@description 将本地通知回调注册，在通知被点击时触发
     *@author jixianjing
     *@history 2020/04/24
     */
    public static registerEvent(id: number, callback: Callback) {
        this.funcCenter[id] = callback;
    }
}
// 初始化推送通知服务
Notification.init();
export default Notification;
