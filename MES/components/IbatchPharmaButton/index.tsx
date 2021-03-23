/**
 * Title        ：全局按钮组件
 * Desc         ：封装常用四个特效按钮
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/18
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import styles from './style';

type TouchableType =
    | 'highlight' // 触摸变暗
    | 'nativeFeedback' // 触摸带涟漪
    | 'opacity' // 触摸变淡
    | 'withoutFeedback'; // 触摸无反馈

export interface ButtonProps {
    touchableType: TouchableType; // 按钮类型
    text?: string; // 按钮文字
    children?: any; // 按钮子节点
    boxStyle?: any; // 容器样式
    style?: any; // 按钮样式
    textStyle?: any; // 文字样式
    onPress?: any; // 点击事件
    onLongPress?: any; // 长按事件
    disabled?: boolean; // 是否禁用
}

export default class IbatchPharmaButton extends Component<ButtonProps> {
    public constructor(props: ButtonProps) {
        super(props);
    }
    public renderContent = () => {
        let { text, children, style, textStyle, disabled = false } = this.props;
        let newStyle = {};
        let backgroundColor = '#2ea99d';
        let color = '#fff';
        if (disabled) {
            newStyle = {
                backgroundColor: '#ddd',
            };
        }
        // 目前无法控制自定义内容的字体颜色
        if (children) {
            let childrenStyle = children.props.style;
            if (Array.isArray(childrenStyle)) {
                return React.cloneElement(children, {
                    style: [...children.props.style, newStyle],
                });
            } else {
                return React.cloneElement(children, {
                    style: { ...children.props.style, ...newStyle },
                });
            }
        } else {
            if (disabled) {
                backgroundColor = '#ddd';
                color = '#555';
                return (
                    <View style={[styles.btnContent, style, { backgroundColor }]}>
                        <Text style={[styles.btnText, textStyle, { color }]}>{text}</Text>
                    </View>
                );
            } else {
                return (
                    <View style={[styles.btnContent, { backgroundColor }, style]}>
                        <Text style={[styles.btnText, { color }, textStyle]}>{text}</Text>
                    </View>
                );
            }
        }
    };

    public render() {
        let { touchableType, onPress, onLongPress, boxStyle, disabled = false } = this.props;
        const touchMap = {
            highlight: TouchableHighlight,
            nativeFeedback: TouchableNativeFeedback,
            opacity: TouchableOpacity,
            withoutFeedback: TouchableWithoutFeedback,
        };
        const TouchableBox: any = touchMap[touchableType];
        if (disabled) {
            return (
                <View style={[styles.btnBox, boxStyle]}>
                    <View>{this.renderContent()}</View>
                </View>
            );
        } else {
            return (
                <View style={[styles.btnBox, boxStyle]}>
                    <TouchableBox onPress={onPress} onLongPress={onLongPress}>
                        {this.renderContent()}
                    </TouchableBox>
                </View>
            );
        }
    }
}
