/**
 * Title        ：页面适配脚本
 * Desc         ：用于设配同等比例设备，为保证屏幕突然变成横屏而改写成对象实例形式
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/05 by jixianjing
 */
import { Dimensions, PixelRatio } from 'react-native';
// 设计稿高度
const DESIGN_WIDTH: number = 720.0;
// 屏幕高度1440（px） 虚拟键盘 96(px)
const DESIGN_HEIGHT: number = 1344.0;

export default class Adaptation {
    private screenW: number; // 屏幕宽度（dp）
    private screenH: number; // 屏幕高度（dp）
    private fontScale: number; // 系统字体缩放比例
    private pixelRatio: number; // px与dp之比
    private screenPxW: number; // 屏幕宽度（px）
    private screenPxH: number; // 屏幕高度（px）

    constructor() {
        let { width, height } = Dimensions.get('window');
        this.screenW = width;
        this.screenH = height;
        this.fontScale = PixelRatio.getFontScale();
        this.pixelRatio = PixelRatio.get();
        this.screenPxW = PixelRatio.getPixelSizeForLayoutSize(this.screenW);
        this.screenPxH = PixelRatio.getPixelSizeForLayoutSize(this.screenH);
    }

    /**
     * 设置text
     * @param size  px
     * @returns {Number} dp
     */
    public setF(size: number): number {
        var scaleWidth: number = this.screenW / DESIGN_WIDTH;
        var scaleHeight: number = this.screenH / DESIGN_HEIGHT;
        var scale: number = Math.min(scaleWidth, scaleHeight);
        size = Math.round((size * scale) / this.fontScale + 0.5);
        return size;
    }

    /**
     * 设置高度
     * @param size  px
     * @returns {Number} dp
     */
    public setH(size: number = DESIGN_HEIGHT): number {
        var scaleHeight: number = (size * this.screenPxH) / DESIGN_HEIGHT;
        size = Math.round(scaleHeight / this.pixelRatio + 0.5);
        return size;
    }

    /**
     * 设置宽度
     * @param size  px
     * @returns {Number} dp
     */
    public setW(size: number = DESIGN_WIDTH): number {
        var scaleWidth: number = (size * this.screenPxW) / DESIGN_WIDTH;
        size = Math.round(scaleWidth / this.pixelRatio + 0.5);
        return size;
    }
}
