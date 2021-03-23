import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
declare let GLOBAL: any;

// 用户信息内容约束
export interface UserInfo {
    account: string;
    name: string;
    userId: number;
    workCenterId: number;
    wkcCode: string;
    wkcName: string;
    ip: string;
    avatar: string;
}

// 初始状态约束
export interface InitialStateITF {
    userInfo: UserInfo | null;
    isLoading: boolean;
}

const initialState: InitialStateITF = {
    userInfo: null,
    isLoading: true,
};

// actions Type
export const types = {
    UPDATA_USERINFO: 'APP/UPDATA_USERINFO',
    CLEAR_USERINFO: 'APP/CLEAR_USERINFO',
    START_LOADING: 'APP/START_LOADING',
    STOP_LOADING: 'APP/STOP_LOADING',
};

//action creators
export const actions = {
    // 更新用户信息（登录）
    updataUserInfo: (userInfo: UserInfo) => ({
        type: types.UPDATA_USERINFO,
        userInfo,
    }),
    // 清除用户信息（注销）
    clearUserInfo: () => ({
        type: types.CLEAR_USERINFO,
    }),
    // 开始获取本地缓存（开机页）
    startLoading: () => ({
        type: types.START_LOADING,
    }),
    // 结束获取本地缓存（开机页）
    stopLoading: () => ({
        type: types.STOP_LOADING,
    }),
};

// 处理actions
const reducer = (state = initialState, action: any) => {
    const { type, userInfo } = action;
    switch (type) {
        case types.UPDATA_USERINFO:
            return {
                ...state,
                userInfo,
            };
        case types.CLEAR_USERINFO:
            return { ...state, userInfo: null };
        case types.START_LOADING:
            return { ...state, isLoading: true };
        case types.STOP_LOADING:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

// selectors
let store: any;
export const getError = (state: any) => {
    return state.app.error;
};
if (GLOBAL.process.env.NODE_ENV !== 'development') {
    store = createStore(reducer);
} else {
    store = createStore(reducer, composeWithDevTools());
}

export default store;
