/**
 * Title        ：系统全局位置选择组件
 * Desc         ：结合PopSelection
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/06/29 by jixianjing
 */
import React from 'react';
import { View, Text } from 'react-native';
import LocationApi from '~/utils/api/location'; // 地址接口类
import PopSelection from '~/components/PopSelection';
import styles, { itemHeight } from './styles';

export default class SelectLocation {
    public static async show(selectItem?: (data: any) => void, location?: string) {
        let res = await LocationApi.queryLocation();
        let data = res.data;
        if (data) {
            PopSelection.show(true, {
                title: '请选择位置',
                data: data.nodes, // 要渲染的数据
                tag: 'barcode',
                clikcItem: (item: any) => {
                    typeof selectItem === 'function' && selectItem(item);
                },
                eachStr: location,
            });
        }
    }

    // 格式化地址
    public static formatLocation(str: string) {
        if (str) {
            str = str
                .replace(/,cn=/g, '.')
                .replace(/,/, '')
                .replace(/cn=/g, '');
        }
        return str;
    }
}
