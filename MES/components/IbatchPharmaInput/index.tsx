import React, { Component } from 'react';
import { View, TextInput, TextInputProps, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import MesIcon from '~/components/Icons';
import Adaptation from '~/utils/adaptation';
const adaptation = new Adaptation();
const clearIconHeight = adaptation.setH(40);
export interface InputProps extends TextInputProps {
    inputType: 'text' | 'pwd' | 'number'; // 输入框类型
    getOutput?: (value: string) => void; // 获取输入内容
    clear?: boolean; // 是否显示清空按钮
    isFill?: boolean; // 容器是否自动填充
}

export interface InputState {
    value?: string;
}

export default class IbatchPhramaInput extends Component<InputProps, InputState> {
    public myRef: any;
    public constructor(props: InputProps) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            value: this.props.defaultValue,
        };
    }

    // 设置值
    private setText = (value: string) => {
        this.setState({
            value: value,
        });
        typeof this.props.getOutput === 'function' && this.props.getOutput(value);
    };
    // 清除值
    private clearText = () => {
        this.setState({
            value: '',
        });
        typeof this.props.getOutput === 'function' && this.props.getOutput('');
    };
    public render() {
        let { inputType, style, clear, isFill, ...afterProps } = this.props;
        let isShow = clear && (this.state.value || this.props.value);
        let boxStyle = isFill ? { flex: 1 } : {};
        return (
            <View style={[styles.box, boxStyle]}>
                <TextInput
                    ref={this.myRef}
                    style={[styles.inputText, style]}
                    selectionColor="#000"
                    secureTextEntry={inputType === 'pwd'}
                    value={this.state.value}
                    onChangeText={this.setText}
                    keyboardType={inputType === 'number' ? 'numeric' : 'default'}
                    {...afterProps}
                />
                {isShow ? (
                    <TouchableWithoutFeedback onPress={this.clearText}>
                        <View style={styles.clear}>
                            <MesIcon name={'call-off'} size={clearIconHeight} />
                        </View>
                    </TouchableWithoutFeedback>
                ) : (
                    <></>
                )}
            </View>
        );
    }
}
