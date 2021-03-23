/**
 * Title        ：系统全局Lodding组件
 * Desc         ：结合ActivityIndicator、Modal、react-native-root-siblings
 * Copyright    : Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/05/06 by jixianjing
 */

import React from 'react';
import { Modal, ActivityIndicator, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

interface LoaddingMap {
    [x: number]: any;
}

class LoaddingItem extends React.Component<any> {
    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Modal transparent={true} visible={true}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            </Modal>
        );
    }
}

export default class Loadding {
    public static Sibling: any;
    public static loaddingMap: LoaddingMap = {};
    // 显示
    public static show(isOnlay: boolean): number | undefined {
        let sibling = new RootSiblings(<LoaddingItem />);
        if (isOnlay) {
            // 清除上一个
            if (this.Sibling) {
                this.Sibling.destroy();
            }
            this.Sibling = sibling;
        } else {
            let index = Math.random();
            // 映射
            this.loaddingMap[index] = sibling;
            return index;
        }
    }

    // 销毁
    public static hide(index?: number) {
        if (index) {
            this.loaddingMap[index].destroy();
        } else {
            if (this.Sibling) {
                this.Sibling.destroy();
            }
        }
    }
}
