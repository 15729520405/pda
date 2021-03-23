/**
 * Title        ：系统全局弹窗选择组件
 * Desc         ：结合ActivityIndicator、Modal、react-native-root-siblings
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/06/17 by jixianjing
 */

import React, { ReactElement } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, FlatList, Animated } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import styles, { closeIconSize, contentH, itemHeight as defaultItemHeight } from './style';
import MesIcon from '~/components/Icons';

interface LoaddingMap {
    [x: number]: any;
}

// 基础属性约束
interface BaseProps {
    title: string; // 标题
    data: any[]; // 要渲染的数据
    tag?: string; // 用来生成列表项key的字段名，默认id
    dataKey?: string; // 数据存储的key,默认为nodes
    renderNavText?: (item: any, isSelected: boolean) => ReactElement; // 自定义导航文字渲染函数
    clikcItem?: (item: any) => void; // 点击列表子节点回调
    backgroundColor?: string; // 模态背景色
    eachStr?: string; // 要被要被遍历选中的文字
    uinqueId?: string; // 用来查找选中的key
    customItem?: {
        itemHeight: number; // 子节点高度
        renderItem: (item: any, isSelected: boolean) => ReactElement; // 自定义列表项渲染函数
    };
}

// 属性约束
interface Props extends BaseProps {
    popIndex?: number; // 弹窗索引
}

// 参数约束
interface Opt extends BaseProps {}

// 状态约束
interface State {
    List: any[]; // 列表数据
    selectIndexArr: number[]; // 选中索引数组
    navIndex: number; // 当前被选中的导航栏索引
    contentH: Animated.AnimatedValue | number; // 动画值
}

interface EachSelectITF {
    data: any[];
    eachStr: string;
    dataKey: string;
    selectIndexArr: number[];
    uinqueId: string;
    i: number;
}

/**
 *@name 选择弹窗主要内容
 *@description 选择弹窗主要内容，包括逻辑和画面
 *@author jixianjing
 */
class PopSelectionContent extends React.Component<Props, State> {
    public constructor(props: any) {
        super(props);
        this.state = {
            List: [],
            selectIndexArr: [],
            navIndex: -1,
            contentH: new Animated.Value(0),
        };
    }

    public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        let { eachStr, data, dataKey = 'nodes', uinqueId = 'location' } = nextProps;
        let { selectIndexArr } = prevState;
        // 有需要便利的值，且没有选中（弹窗刚弹出来的时候）
        if (eachStr && selectIndexArr.length === 0) {
            return {
                selectIndexArr:
                    PopSelectionContent.eachSelect({
                        data,
                        eachStr,
                        dataKey,
                        selectIndexArr,
                        uinqueId,
                        i: 0,
                    }) || [],
            };
        } else {
            return null;
        }
    }

    // 遍历选中
    public static eachSelect = ({
        data,
        eachStr,
        dataKey,
        selectIndexArr,
        uinqueId,
        i,
    }: EachSelectITF): number[] | undefined => {
        let j = i + 1;
        for (let index = 0, len = data.length; index < len; index++) {
            let item = data[index];
            selectIndexArr[i] = index;
            if (item[uinqueId] === eachStr) {
                return selectIndexArr;
            }
            if (
                item[dataKey] &&
                item[dataKey].length > 0 &&
                Array.isArray(
                    PopSelectionContent.eachSelect({
                        data: item[dataKey],
                        eachStr,
                        dataKey,
                        selectIndexArr,
                        uinqueId,
                        i: j,
                    }),
                )
            ) {
                return PopSelectionContent.eachSelect({
                    data: item[dataKey],
                    eachStr,
                    dataKey,
                    selectIndexArr,
                    uinqueId,
                    i: j,
                });
            }
        }
        return;
    };

    /**
     *@name 列表中子项的key生成
     *@description 用于生成列表子项key
     *@author jixianjing
     *@history 2020/06/22
     */
    private keyExtractor = (item: any) => {
        if (item) {
            let key = this.props.tag;
            if (key) {
                return item[key].toString();
            }
            return item.id.toString();
        }
    };

    // 关闭弹窗
    private close = () => {
        PopSelection.hide(this.props.popIndex);
    };

    /**
     *@name 导航栏点击事件
     *@description 设置列表数据、导航栏索引
     *@author jixianjing
     *@history 2020/06/22
     */
    public selectSection = (list: any[], index: number) => {
        this.setState({
            List: [...list],
            navIndex: index,
        });
    };

    /**
     *@name 列表项点击事件
     *@description 列表项点击事件
     *@author jixianjing
     *@history 2020/06/22
     */
    public selectItem = (item: any, index: number) => {
        let { dataKey = 'nodes' } = this.props;
        let { navIndex, selectIndexArr } = this.state;
        let { clikcItem } = this.props;
        // 判断是否重复点击
        if (selectIndexArr[navIndex] !== index) {
            selectIndexArr[navIndex] = index;
            // 删除剩余的数组
            selectIndexArr.splice(navIndex + 1, selectIndexArr.length - (navIndex + 1));
            this.setState({
                selectIndexArr: [...selectIndexArr],
            });
            typeof clikcItem === 'function' && clikcItem(item);
            // 已经是最后一层了关闭弹窗
            if (!Array.isArray(item[dataKey]) || item[dataKey].length === 0) {
                // this.close();
            }
        }
    };

    /**
     *@name 导航栏渲染
     *@description 导航栏渲染
     *@author jixianjing
     *@history 2020/06/22
     */
    private renderNav = (data: any[], index: number, dataKey: string): ReactElement => {
        let { selectIndexArr, navIndex } = this.state;
        let selectIndex = selectIndexArr[index];
        let renderNavText = this.props.renderNavText;
        if (Array.isArray(data) && data.length > 0) {
            let activeColor = navIndex === index ? 'rgba(255, 119, 9, 1.0)' : '#000';
            let isSelected = navIndex === index;
            let oldIndex = index;
            if (selectIndex >= 0) {
                let item = data[selectIndex];
                return (
                    <View>
                        {item && (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.selectSection(data, oldIndex);
                                }}>
                                <View style={styles.navItem}>
                                    <View style={styles.navItemGuide}>
                                        {/* 点 */}
                                        <View style={styles.navItemGuideSpot} />
                                        {/* 上线 */}
                                        {index !== 0 && <View style={[styles.navItemGuideLine, styles.TopLine]} />}
                                        {/* 下线 */}
                                        {item[dataKey].length !== 0 && (
                                            <View style={[styles.navItemGuideLine, styles.BottomLine]} />
                                        )}
                                    </View>
                                    <View style={styles.navTextBox}>
                                        {typeof renderNavText === 'function' ? (
                                            renderNavText(item, isSelected)
                                        ) : (
                                            <Text style={[styles.navText, { color: activeColor }]}>{item.cn}</Text>
                                        )}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        {this.renderNav(item[dataKey], ++index, dataKey)}
                    </View>
                );
            } else {
                return (
                    <View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.selectSection(data, oldIndex);
                            }}>
                            <View style={styles.navItem}>
                                <View style={styles.navItemGuide}>
                                    {/* 点 */}
                                    <View style={styles.navItemGuideSpotActive} />
                                    {/* 上线 */}
                                    {index !== 0 && <View style={[styles.navItemGuideLine, styles.TopLine]} />}
                                </View>
                                <View style={styles.navTextBox}>
                                    <Text style={[styles.navText, { color: activeColor }]}>
                                        {index === 0 ? '请选择第一级' : '请选择下一级'}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                );
            }
        } else {
            return <></>;
        }
    };

    /**
     *@name 列表项渲染
     *@description 列表项渲染
     *@author jixianjing
     *@history 2020/06/22
     */
    private renderItem = ({ item, index }: any) => {
        let { customItem } = this.props;
        let { selectIndexArr, navIndex } = this.state;
        let viewStyle = index === selectIndexArr[navIndex] ? styles.itemActive : styles.itemNormal;
        let isSelected = index === selectIndexArr[navIndex];
        // 有自定义子列表
        if (customItem && typeof customItem.renderItem === 'function') {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.selectItem(item, index);
                    }}>
                    <View>{customItem.renderItem(item, isSelected)}</View>
                </TouchableWithoutFeedback>
            );
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.selectItem(item, index);
                }}>
                <View style={viewStyle}>
                    <View style={styles.item}>
                        <Text>{item.cn}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    public componentDidMount() {
        // 动画开始
        Animated.timing(this.state.contentH as Animated.AnimatedValue, {
            toValue: contentH,
            duration: 200,
        }).start();
    }

    public render() {
        let { data, customItem, title, dataKey = 'nodes', backgroundColor = 'rgba(0,0,0,0.5)' } = this.props;
        let { List, contentH } = this.state;
        let itemHeight = defaultItemHeight;
        if (customItem) {
            itemHeight = customItem.itemHeight;
        }
        return (
            <Modal visible={true} transparent={true}>
                <View style={[styles.container, { backgroundColor }]}>
                    <Animated.View style={[styles.content, { height: contentH }]}>
                        {/* 头部 */}
                        <View style={styles.header}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableWithoutFeedback onPress={this.close}>
                                <View style={styles.close}>
                                    <MesIcon name={'call-off'} size={closeIconSize} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {/* 导航 */}
                        <View style={styles.nav}>{this.renderNav(data, 0, dataKey)}</View>
                        {/* 内容 */}
                        <View style={styles.autoFill}>
                            <FlatList
                                style={styles.autoFill}
                                data={List}
                                // 辅助计算高度
                                getItemLayout={(data, index) => ({
                                    length: itemHeight,
                                    offset: itemHeight * (index - 1) + itemHeight,
                                    index,
                                })}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        );
    }
}

export default class PopSelection {
    public static Sibling: any;
    public static loaddingMap: LoaddingMap = {};

    // 显示
    public static show(isOnlay: boolean, opt: Opt): void | number {
        let index = Math.random();
        if (isOnlay) {
            // 清除上一个
            if (PopSelection.Sibling) {
                this.Sibling.destroy();
            }
            this.Sibling = new RootSiblings(<PopSelectionContent {...opt} />);
        } else {
            // 映射
            let handelOpt = { ...opt, popIndex: index };
            this.loaddingMap[index] = new RootSiblings(<PopSelectionContent {...handelOpt} />);
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
