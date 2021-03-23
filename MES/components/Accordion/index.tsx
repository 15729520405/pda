/**
 * Title        ：手风琴组件
 * Desc         ：符合系统样式的手风琴组件
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/15  by jixianjing
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import MesIcon from '~/components/Icons';
import Adaptation from '~/utils/adaptation';
const adaptation = new Adaptation();
interface AccordionProps {
    linkage: boolean; // 是否联动
    children: any; // 子元素（Panel）
    selectIndex?: number; // 初始选中(Panel)
    openAmimate?: boolean; // 是否开启动画（开启动画会损耗性能）
}

interface AccordionState {
    selectArr: number[]; // 展开的数组
}
/**
 *@name 手风琴面板父类
 *@description 手风琴面板父类，控制状态
 *@author jixianjing by
 */
class Accordion extends Component<AccordionProps, AccordionState> {
    static Panel: any;
    public constructor(props: AccordionProps) {
        super(props);
        let selectIndex: number = this.props.selectIndex as number;
        this.state = {
            selectArr: [selectIndex >= 0 ? selectIndex : -1],
        };
    }

    // 面板点击函数
    private clickItem = (index: number) => {
        let selectArr = this.state.selectArr;
        let linkage = this.props.linkage;
        // 点击面本在选中数组中的索引
        let location = selectArr.findIndex((value) => {
            return value === index;
        });
        if (location !== -1) {
            if (linkage) {
                this.setState({
                    selectArr: [],
                });
            } else {
                selectArr.splice(location, 1);
                let newArr = [...selectArr];
                this.setState({
                    selectArr: newArr,
                });
            }
        } else {
            if (linkage) {
                this.setState({
                    selectArr: [index],
                });
            } else {
                this.setState({
                    selectArr: [...selectArr, index],
                });
            }
        }
    };
    // 防止重复渲染
    public shouldComponentUpdate(nextProps: any, nextState: any) {
        // 选中数组不改变，不渲染
        return nextState.selectArr !== this.state.selectArr;
    }

    // 给子元素附加属性
    private renderPanel = () => {
        return React.Children.map(this.props.children, (child: any, index) => {
            return React.cloneElement(child, {
                index: index,
                collapse: this.state.selectArr.includes(index),
                toogle: this.clickItem,
                openAmimate: this.props.openAmimate,
            });
        });
    };

    public render() {
        return <View>{this.renderPanel()}</View>;
    }
}

interface AccordionPanelProps {
    title: string; // 标题
    index?: number; // 索引(不需要传递，由父级在渲染时传递)
    collapse?: boolean; // 是否展开(不需要传递，由父级在渲染时传递)
    toogle?: (index: number) => void; // 点击展开函数(不需要传递，由父级在渲染时传递)
    openAmimate?: boolean; // 是否提供动画(不需要传递，由父级在渲染时传递)
}

interface AccordionPanelState {
    contentH: Animated.AnimatedValue | number; // 动画值
}

class AccordionPanel extends Component<AccordionPanelProps, AccordionPanelState> {
    // 子节点高度
    private childH: number;
    public constructor(props: AccordionPanelProps) {
        super(props);
        this.childH = 0;
        this.state = {
            contentH: new Animated.Value(adaptation.setH(2)),
        };
    }

    // 点击事件
    private toogle = () => {
        let { index, toogle } = this.props;
        // 将当前面板索引传给父级
        typeof toogle === 'function' && toogle(index as number);
    };

    // 防止重复渲染
    public shouldComponentUpdate(nextProps: any) {
        return nextProps.collapse !== this.props.collapse;
    }

    public componentDidUpdate() {
        let { collapse, openAmimate } = this.props;
        if (!openAmimate) {
            return;
        }
        // 动画开始
        Animated.timing(this.state.contentH as Animated.AnimatedValue, {
            toValue: collapse ? this.childH + adaptation.setH(2) : adaptation.setH(2),
            duration: 100,
        }).start();
    }

    public render() {
        const iconSize = adaptation.setH(28);
        let { title, collapse, openAmimate } = this.props;
        let children: any = this.props.children;
        let contentH = openAmimate ? this.state.contentH : 'auto';
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.toogle}>
                    <View style={styles.panelHeader}>
                        <Text style={styles.panelHeaderText}>{title}</Text>
                        <MesIcon
                            name={collapse ? 'icon-shape-of-up' : 'icon-shape-of-down'}
                            size={iconSize}
                            color="#666"
                        />
                    </View>
                </TouchableWithoutFeedback>
                <Animated.View style={[styles.pannelContent, { height: contentH }]}>
                    {openAmimate
                        ? React.cloneElement(children, {
                              onLayout: (e: any) => {
                                  // 获取内容高度
                                  this.childH = e.nativeEvent.layout.height;
                                  let { collapse, openAmimate } = this.props;
                                  if (!openAmimate) {
                                      return;
                                  }
                                  // 动画开始
                                  Animated.timing(this.state.contentH as Animated.AnimatedValue, {
                                      toValue: collapse ? this.childH + adaptation.setH(2) : adaptation.setH(2),
                                      duration: 100,
                                  }).start();
                              },
                          })
                        : collapse && children}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: adaptation.setH(80),
    },
    pannelContent: {
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: adaptation.setH(2),
        overflow: 'hidden',
    },
    panelHeaderText: {
        marginRight: adaptation.setW(14),
        fontSize: adaptation.setF(32),
        lineHeight: adaptation.setH(34),
        color: '#333',
        fontFamily: 'SourceHanSansK-Normal',
    },
});

Accordion.Panel = AccordionPanel;
export default Accordion;
