/**
 * Title        ：开机页
 * Desc         ：开机页面
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/15
 */

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions, UserInfo } from '~/store';
import AsyncStorage from '@react-native-community/async-storage';

// @ts-ignore
import CookieManager from 'react-native-cookie';
import Path from '~/utils/http/path';
class OpenAnimate extends React.PureComponent<any> {
    public constructor(props: any) {
        super(props);
        this.props.startLoading();
    }
    public async componentDidMount() {
        let userToken = await CookieManager.get(Path.BASE_URL);
        console.log(userToken);
        // 如果没有Cookie
        if (userToken !== null && userToken.BATCHSIGHT_MOBILE_SSO_TICKET !== null) {
            let userInfo = await AsyncStorage.getItem('userInfo');
            this.props.updateUserInfo(JSON.parse(userInfo as string));
        }
        this.props.stopLoading();
    }
    public render() {
        return <View style={{ flex: 1 }} />;
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    startLoading: () => dispatch(actions.startLoading()),
    stopLoading: () => dispatch(actions.stopLoading()),
    updateUserInfo: (userInfo: UserInfo) => dispatch(actions.updataUserInfo(userInfo)),
});
export default connect(
    null,
    mapDispatchToProps,
)(OpenAnimate);
