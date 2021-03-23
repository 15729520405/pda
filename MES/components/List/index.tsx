/**
 * Title        ：列表组件
 * Desc         ：封装于FlatList组件，继承FlatList、VirtualizedList、ScrollView中原有的属性
 * Copyright    : Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/23  by jixianjing
 */
import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';

// 属性约束
interface ListProps {
    data: any[]; // 列表数据
    children: any; // 子节点
    itemHeight: number; // 子项目高度
    tag?: string; // 用来生成列表项key的字段名，默认id
    isLoding?: boolean; // 开启加载
    isPaging?: boolean; // 是否分页
    [x: string]: any;
}

/**
 *@name 系统全局列表组件
 *@description 封装于FlatList组件，继承FlatList、VirtualizedList、ScrollView中原有的属性
 *@author jixianjing
 */
export default class List extends React.PureComponent<ListProps> {
    public constructor(props: ListProps) {
        super(props);
    }

    /**
     *@name 生成key
     *@description 用于生成唯一标识key
     *@author jixianjing
     *@history 2020/03/18
     */
    private keyExtractor = (item: any, index: number) => {
        let tag = this.props.tag;
        if (tag) {
            return item[tag].toString();
        }
        return item.id.toString();
    };

    /**
     *@name 渲染子节点
     *@description 给子节点附加一些属性
     *@author jixianjing
     *@history 2020/03/18
     */
    private renderItem = ({ item, index }: any) => React.cloneElement(this.props.children, { index, ...item });

    public render() {
        let { itemHeight, isLoding = false, ...afterProps } = this.props;
        return (
            <FlatList
                // 头组件
                // ListHeaderComponent={() =>
                //     <Text style={{ textAlign: 'center', lineHeight: 40 }}>FlatList!</Text>
                // }
                // 尾部组件
                ListFooterComponent={() => {
                    let { data, isPaging } = this.props;
                    if (data.length === 0 || !isPaging) {
                        return <></>;
                    } else {
                        return (
                            <View>
                                {/* <ActivityIndicator
                                        // 是否显示
                                        animating={isLoding}
                                        // 大小
                                        size={30}
                                        // 颜色
                                        color='red'
                                    /> */}
                                <Text style={{ textAlign: 'center', lineHeight: 40 }}>
                                    {isLoding ? '正在加载' : '没有更多数据了'}
                                </Text>
                            </View>
                        );
                    }
                }}
                // 列表为空时组件
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', lineHeight: 40 }}>没有找到匹配的数据!</Text>
                    </View>
                )}
                // 分割线
                // ItemSeparatorComponent={({ highlighted, unhighlight }) => (
                //     <View style={[{ height: 1, backgroundColor: 'red' }, highlighted && { backgroundColor: 'red' }]} />
                // )}
                // 辅助计算高度
                getItemLayout={(data, index) => ({
                    length: itemHeight,
                    offset: itemHeight * (index - 1) + itemHeight,
                    index,
                })}
                // 保证不被滑动卸载的元素
                // initialNumToRender={}
                // 第一个显示的元素，类似于锚点
                // initialScrollIndex = {2}
                // 旋转滚动方向
                inverted={false}
                // 内容距离底部为屏幕的10%
                onEndReachedThreshold={0.1}
                // 滚到底部的回调
                // onEndReached={}
                // 指示器
                // refreshing={refreshing}
                // 监听刷新
                // onRefresh={}
                // data={data}
                // 用作列表以外的数据
                // extraData={}
                keyExtractor={this.keyExtractor}
                // 子元素组件
                renderItem={this.renderItem}
                // 集成组件原始属性
                {...afterProps}
            />
        );
    }
}
