/**
 * Title        ：岗位切换页
 * Desc         ：用于切换岗位
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixainjing by 2020/05/24
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WorkCenterChangeScreenProps } from '~/router';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import List from '~/components/List';
import IbatchPharmaInput from '~/components/IbatchPharmaInput';
import { connect } from 'react-redux';
import { actions, UserInfo, InitialStateITF } from '~/store';
import WorkCenterApi, { WorkCenterDtoITF, QueryWorkCenterRes } from '~/utils/api/workCenter';
import ListItem, { itemHeight } from './components/ListItem';
const adaptation = new Adaptation();

interface WorkCenterChangeScreenState {
    workCenterList: WorkCenterDtoITF[];
}

interface Props extends WorkCenterChangeScreenProps {
    updateUserInfo: (userInfo: UserInfo) => void;
    userInfo: InitialStateITF['userInfo'];
}

class WorkCenterChange extends React.PureComponent<Props, WorkCenterChangeScreenState> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            workCenterList: [],
        };
    }

    // 查询岗位
    private queryWorkCenter = async (text: string) => {
        let result: QueryWorkCenterRes = await WorkCenterApi.queryWorkCenter({ valid: 1, str: text });
        if (result.data) {
            this.setState({
                workCenterList: result.data,
            });
        }
    };

    // 保存岗位
    private saveWorkCenter = async (workCenterDto: WorkCenterDtoITF) => {
        let { updateUserInfo, navigation } = this.props;
        let userInfo = this.props.userInfo as UserInfo;
        let { id, name, code } = workCenterDto;
        if (userInfo.workCenterId !== workCenterDto.id) {
            await WorkCenterApi.changeWorkCenter({ wkcId: id });
            // 更新用户信息
            updateUserInfo({
                ...userInfo,
                workCenterId: id,
                wkcCode: code,
                wkcName: name,
            });
        }
        // 回到上一页
        navigation.goBack();
    };

    public componentDidMount() {
        this.queryWorkCenter('');
    }

    public render() {
        let { workCenterList } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <IbatchPharmaInput
                        inputType="text"
                        style={styles.searchInput}
                        placeholder="搜索"
                        onSubmitEditing={(e) => {
                            this.queryWorkCenter(e.nativeEvent.text);
                        }}
                    />
                </View>
                <List style={styles.list} data={workCenterList} itemHeight={itemHeight}>
                    <ListItem onPress={this.saveWorkCenter} />
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    search: {
        padding: adaptation.setH(20),
        backgroundColor: '#f7f7f7',
    },
    searchInput: {
        backgroundColor: '#fff',
    },
    list: {
        flex: 1,
        paddingLeft: adaptation.setW(20),
        paddingRight: adaptation.setW(20),
        paddingBottom: adaptation.setH(20),
    },
});
const mapStateToProps = (state: InitialStateITF) => ({
    userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateUserInfo: (userInfo: UserInfo) => dispatch(actions.updataUserInfo(userInfo)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkCenterChange);
