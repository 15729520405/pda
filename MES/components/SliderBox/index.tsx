/**
 * Title        ：滑动删除容器组件
 * Desc         ：主要用于列表中的子项,使其可以滑动
 * Copyright    : Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/18
 */
import React from 'react';
import Swipeout, { SwipeoutButtonProperties } from 'react-native-swipeout';

interface Props {
    uniqueVal: string | number;
    selectId: string | number;
    children: any;
    BtnsLeft: SwipeoutButtonProperties[];
    BtnsRight: SwipeoutButtonProperties[];
    onOpen: (id: string | number) => void;
    [x: string]: any;
}

/**
 *@name 滑动删除组件
 *@description 用于包裹列表子项使其可以滚动删除
 *@author jixianjing
 */
export default class SliderBox extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);
    }
    public render() {
        let { BtnsLeft, BtnsRight, selectId, uniqueVal, children, onOpen } = this.props;
        return (
            <Swipeout
                close={!(selectId === uniqueVal)}
                right={BtnsRight}
                left={BtnsLeft}
                // rowId={id}
                autoClose={false}
                backgroundColor="white"
                onOpen={(sectionId, rowId, direction) => {
                    onOpen(uniqueVal);
                }}
                scroll={(event) => console.log('scroll event')}>
                {children}
            </Swipeout>
        );
    }
}
