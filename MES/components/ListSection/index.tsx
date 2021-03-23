/**
 * Title        ：系统全局列表分组组件
 * Desc         ：封装于SectionList组件，继承SectionList、VirtualizedList、ScrollView中原有的属性
 * Copyright    : Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/23  by jixianjing
 */
import React, { ReactElement } from 'react';
import { Text, View, SectionList } from 'react-native';

export interface Section {
    title: string;
    data: any[];
    [x: string]: any;
}

// 属性约束
interface ListSectionProps {
    sections: Section[]; // 列表数据
    children: ReactElement; // 子节点
    renderSectionHeader: any; // 分组头部节点
    tag?: string; // 用来生成列表项key的字段名，默认id
    isLoding?: boolean; // 开启加载
    [x: string]: any;
}

/**
 *@name 系统全局列表分组组件
 *@description 封装于SectionList组件，继承SectionList、VirtualizedList、ScrollView中原有的属性
 *@author jixianjing
 */
export default class ListSection extends React.PureComponent<ListSectionProps> {
    public constructor(props: ListSectionProps) {
        super(props);
    }

    public componentDidMount() {}
    /**
     *@name 生成key
     *@description 用于生成唯一标识key
     *@param item 返回值为data 中的每一项
     *@param index 组中索引
     *@author jixianjing
     *@history 2020/03/18
     */
    private keyExtractor = (item: any, index: number) => {
        let tag = this.props.tag;
        if (tag) {
            return item[tag];
        }
        return item.id;
    };

    /**
     *@name 渲染子节点
     *@description 给子节点附加一些属性
     *@param index 组中索引
     *@author jixianjing
     *@history 2020/03/18
     */
    private renderItem = ({ item, index, section }: any) => React.cloneElement(this.props.children, { ...item });

    public render() {
        let { sections, isLoding = false, ...afterProps } = this.props;
        return (
            <SectionList
                sections={sections}
                // 头组件
                // ListHeaderComponent={() =>
                //     <Text style={{ textAlign: 'center', lineHeight: 40 }}>FlatList!</Text>
                // }
                // 尾部组件
                ListFooterComponent={() => (
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
                )}
                // 列表为空时组件
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', lineHeight: 40 }}>没有数据!</Text>
                    </View>
                )}
                // 分割线
                // ItemSeparatorComponent={({ highlighted, unhighlight }) => (
                //     <View style={[{ height: 1, backgroundColor: 'red' }, highlighted && { backgroundColor: 'red' }]} />
                // )}
                // 类似于分割线的组件
                // SectionSeparatorComponent
                // 辅助计算高度
                // getItemLayout={(data, index) => (
                //     { length: itemHeight, offset: itemHeight * (index - 1) + itemHeight, index }
                // )}
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
                // 可见元素变化时调用
                // onViewableItemsChanged={（）=> void}
                // 每个sections的头部组件
                // renderSectionFooter
                // 每个sections的尾部组件
                //renderSectionHeader
                keyExtractor={this.keyExtractor}
                // 子元素组件
                renderItem={this.renderItem}
                // 增加渲染性能(可导致页面内容丢失)
                //removeClippedSubviews={true}
                // 集成组件原始属性
                {...afterProps}
            />
        );
    }
}
