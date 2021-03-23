/**
 * Title        ：网络请求脚本
 * Desc         ：用于网络请求，提供各种类型的网络请求方法
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/19 by jixianjing
 */
import { AxiosRequestConfig, CancelToken } from 'axios';
import Service from './server';
import Path from './path';
import RNFS from 'react-native-fs';
// @ts-ignore
import Qs from 'qs';
import Loadding from '~/components/Loadding';

// 通用结果返回约束
export interface UnifyResult<T> {
    apiId: number;
    data: T;
    dataType: string;
    elapsed: number;
    errorCode: number;
    errorInfo: number;
    success: boolean;
    total: number;
}

// 基础请求参数约束
interface BaseOptions {
    url: string; // 请求路径
    cancelToken?: CancelToken; // 取消函数令牌
    headers?: any; // 头部
    isLoadding?: boolean; // 是否显示加载状态
    errIgnore?: boolean; // 是否忽略错误
}

// 请求参数约束
export interface Options extends BaseOptions {
    traditional?: boolean; // 是否需要深度序列化
    data: any; // 请求数据
}

// 通用请求参数约束
export interface UnifyOptions extends Options {
    transformRequest?: (data: any) => string; // 自定义序列化函数
    paramsSerializer?: (params: any) => string; // 自定义序列化函数
}

// get请求参数约束
export interface GetOptions extends Options {
    paramsSerializer?: (params: any) => string; // 自定义序列化函数
}

export interface OtherOptions extends Options {
    transformRequest?: (data: any) => string; // 自定义序列化函数
}

// 下载请求参数约束(web版)
export interface DownLoadFileOptionsWeb extends GetOptions {
    onDownloadProgress?: (progressEvent: any) => void; // 下载进度处理事件
}
type SaveDir =
    | 'MainBundlePath' // 仅IOS,打包 app 的绝对路径，相当于你可以直接读取 app 内部的一些资源文件，仅在 iOS 下可用，使用的时候要注意拼接路径； android 没这个东西，做双平台的话，应避免使用这个，也没必要，把资源直接打包，也会增加安装包体积
    | 'DocumentDirectoryPath' // 存放 app 使用过程中产生的用户私人文件，可持久化保存，iTunes iCloud 备份/恢复包含此目录，想必 android 应该是同理的
    | 'LibraryDirectoryPath' // 仅IOS,存储配合应用程序的其他非个人文件的数据，比如一些应用程序的配置文件啥的，android 没有这个目录，也应尽量避免使用，当需要存储此类数据，建议放到 CachesDirectoryPath
    | 'CachesDirectoryPath' // 应用程序数据缓存目录，可持久化保存，但可能面临被清除的风险（比如一些清理垃圾文件的操作），所以应用程序如果使用该目录应该做兜底处理
    | 'TemporaryDirectoryPath' // 临时文件目录，这个纯粹是临时的，重启手机，或者文件过多，系统层面就直接清除这个目录，都无需用户去特意触发，用来存放用一下子就仍的文件。 Android 没这个目录，react-native-fs 默认返回了 CachesDirectoryPath 的路径
    | 'ExternalDirectoryPath' // 仅Android,sd卡目录，对应着 DocumentDirectoryPath
    | 'ExternalCachesDirectoryPath' // 仅Android,sd卡目录，对应着 CachesDirectoryPath
    | 'ExternalStorageDirectoryPath' // 仅Android, android 共享的 sd 卡目录，需要申请权限才能使用
    | 'PicturesDirectoryPath' // 仅Android, android 共享的 sd 卡目录，需要申请权限才能使用
    | 'FileProtectionKeys'; // 都没有,

type Method = 'get' | 'post' | 'delete' | 'put' | 'patch';
export interface DownLoadFileOptionsNative {
    url: string; // 文件路径
    saveDir: SaveDir; // 保存目录
    fileName: string; // 文件名
    progress?: (data: any) => void; // 进度监听
    beginCallBack?: (data: any) => void; // 开始下载的回调函数
}

// 文件约束
export interface File {
    url: string; // 文件路径file：// 协议
    type: 'multipart/form-data;charset=utf-8' | string; // 编码类型
    name: string; // 文件名使用 encodeURIComponent编码
    fileType: string; // MIME类型 或文件后缀名
}

// 上传请求参数约束
export interface UpLoadFileOptions extends BaseOptions {
    onUploadProgress?: (progressEvent: any) => void; // 上传进度处理事件
    files: File[];
}

export default class Http {
    // 基础参数
    private static basicConfig(opt: BaseOptions): BaseOptions {
        let { url, cancelToken, headers, isLoadding, errIgnore } = opt;
        let config: BaseOptions = {
            url,
        };

        if (cancelToken) {
            config.cancelToken = cancelToken;
        }

        if (headers) {
            config.headers = headers;
        }

        if (errIgnore) {
            config.errIgnore = errIgnore;
        }

        if (isLoadding) {
            Loadding.show(true);
        }

        return config;
    }

    // 通用请求
    private static unifyRequest(opt: UnifyOptions, method: Method): Promise<any> {
        let { data, traditional, transformRequest, paramsSerializer } = opt;
        let config: AxiosRequestConfig = {
            ...this.basicConfig(opt),
            method,
        };
        if (method === 'get') {
            config.params = data;
            // 是否有参数序列化处理事件
            if (paramsSerializer) {
                config.paramsSerializer = paramsSerializer;
            } else {
                // 是否需要参数序列化
                if (traditional) {
                    config.paramsSerializer = function(params) {
                        return Qs.stringify(params, { arrayFormat: 'repeat' });
                    };
                }
            }
        } else {
            config.data = data;
            // 是否有参数序列化处理事件
            if (transformRequest) {
                config.transformRequest = transformRequest;
            } else {
                if (traditional) {
                    config.transformRequest = [
                        function(data) {
                            return Qs.stringify(data, { arrayFormat: 'repeat' });
                        },
                    ];
                }
                // 是个对象
                else {
                    data = JSON.stringify(data);
                    config.data = data;
                }
            }
        }
        return Service(config);
    }

    // get情求（查询）
    public static get(opt: GetOptions): Promise<any> {
        return this.unifyRequest(opt, 'get');
    }

    // post请求（新增）
    public static post(opt: OtherOptions): Promise<any> {
        return this.unifyRequest(opt, 'post');
    }

    // delete请求（删除）
    public static del(opt: OtherOptions): Promise<any> {
        return this.unifyRequest(opt, 'delete');
    }

    // put请求（整个dto都更新）
    public static put(opt: OtherOptions): Promise<any> {
        return this.unifyRequest(opt, 'put');
    }

    // patch请求（局部更新）
    public static patch(opt: Options): Promise<any> {
        return this.unifyRequest(opt, 'patch');
    }

    // 下载文件(web版)
    public static downLoadFileWeb(opt: DownLoadFileOptionsWeb): Promise<any> {
        let { data, traditional, paramsSerializer, onDownloadProgress } = opt;
        let config: AxiosRequestConfig = {
            ...this.basicConfig(opt),
            method: 'get',
            responseType: 'blob',
            params: data,
        };
        // 是否有参数序列化处理事件
        if (paramsSerializer) {
            config.paramsSerializer = paramsSerializer;
        } else {
            // 是否需要参数序列化
            if (traditional) {
                config.paramsSerializer = function (params) {
                    return Qs.stringify(params, { arrayFormat: 'repeat' });
                };
            }
        }
        // 是否有下载进度处理事件
        if (onDownloadProgress) {
            config.onDownloadProgress = onDownloadProgress;
        }
        return Service(config);
    }

    // 下载文件(native版)
    public static downLoadFileNative(opt: DownLoadFileOptionsNative): Promise<any> {
        let { url, saveDir, fileName, progress, beginCallBack } = opt;
        //下载进度进度结果返回(下载过程持续返回进度)：
        // var progress = data => {
        //     var percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
        //     var text = `进度 ${percentage}%`;
        //     console.log(text)
        // };
        //开始下载后的回调函数--这里我是赋值到外面变量去
        // let beginCallBack = (res: any) => {
        //     jobId1 = res.jobId; //下载的id
        //     statusCode = res.statusCode;  //下载的http状态码
        //     contentLength = res.contentLength;  //下载的总字节
        // };

        //下载所需要的参数,包括一些回调函数,传进下载函数的参数中
        let DownloadFileOptions = {
            fromUrl: `${Path.BASE_URL}${url}`, //下载的文件地址
            //保存文件的路径,路径要包括你自定义文件的名字和格式.即系统路径+"/文件名.格式"
            toFile: `${RNFS[saveDir]}/${fileName}`,
            //开始下载后的回调函数
            begin: beginCallBack,
            progress: progress, //进度回调函数
            background: true, //继续在后台下载该APP后终止(IOS)
            progressDivider: 1, //进度回调函数返回的间隔
        };
        return RNFS.downloadFile(DownloadFileOptions).promise;
    }

    // 上传文件
    public static upLoadFile(opt: UpLoadFileOptions): Promise<any> {
        let { files, onUploadProgress } = opt;
        let formData = new FormData();
        files.forEach((item) => {
            formData.append('file', item);
        });
        let config: AxiosRequestConfig = {
            ...this.basicConfig(opt),
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
        };
        // 是否有下载进度处理事件
        if (onUploadProgress) {
            config.onUploadProgress = onUploadProgress;
        }
        return Service(config);
    }
}
