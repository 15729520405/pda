/**
 * Title        ：按需加载组件（高阶组件）
 * Desc         ：将传入组件封装成使用时才会加载的组件
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/16  by jixianjing
 */
import React, { Component } from 'react';

interface State {
    component: any;
}

export default function asyncComponent(importComponent: any) {
    class AsyncComponent extends Component<any, State> {
        public constructor(props: any) {
            super(props);
            this.state = {
                component: null,
            };
        }

        public componentDidMount() {
            importComponent().then((mod: any) => {
                this.setState({
                    component: mod.default,
                });
            });
        }

        public render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}
