/**
 * Title        ：切换岗位页中的列表展示子组件
 * Desc         ：展示岗位信息
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : jixianjing by 2020/05/24
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import IbatchPharmaButton from '~/components/IbatchPharmaButton';

const adaptation = new Adaptation();
const marginTop = adaptation.setH(20);
const contentH = adaptation.setH(88);
export const itemHeight = marginTop + contentH;
export default class ListItem extends React.PureComponent<any> {
    public constructor(props: any) {
        super(props);
    }

    // 格式化 地址
    private formatLocation = (str: string) => {
        if (str) {
            str = str
                .replace(/,cn=/g, '.')
                .replace(/,/, '')
                .replace(/cn=/g, '');
        }
        return str;
    };

    public render() {
        let text = `${this.props.code}(${this.props.name})`;
        return (
            <IbatchPharmaButton
                touchableType="opacity"
                style={styles.box}
                textStyle={styles.text}
                text={text}
                onPress={() => {
                    let { onPress, ...workCenterDto } = this.props;
                    onPress(workCenterDto);
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    box: {
        marginTop: marginTop,
        height: contentH,
        backgroundColor: '#eee',
    },
    text: {
        color: '#666',
    },
});
