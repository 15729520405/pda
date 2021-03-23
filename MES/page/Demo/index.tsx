/**
 * Title        ：Demo页
 * Desc         ：用于展示组件或第三方插件
 * Copyright: Copyright: Shanghai Batchsight Pharmaceutical Techologies，Inc. Copyright(c) 2020
 * version      ：1.0
 * History      : 2020/03/15  by jixianjing
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Button,
    Platform,
    ActivityIndicator,
} from 'react-native';
// 自定义组件
import List from '~/components/List';
import ListSection, { Section } from '~/components/ListSection';
import IbatchPharmaButton from '~/components/IbatchPharmaButton';
import IbatchPharmaInput from '~/components/IbatchPharmaInput';
import Accordion from '~/components/Accordion';
import PopSelection from '~/components/PopSelection';
// 自定义脚本
import Path from '~/utils/http/path';
// 自定义封装的原生模块
import ScanBarCode from '~/utils/scanBarCode';
// 封装后的第三方插件
import SliderBox from '~/components/SliderBox';
import IbatchPharmaPermissions from '~/utils/ibatchPharmaPermissions';
// 第三方插件
import ViewPager from '@react-native-community/viewpager';
import Swiper from 'react-native-swiper';
import { SwipeoutButtonProperties } from 'react-native-swipeout';
import RNFS from 'react-native-fs';
import Toast from 'react-native-root-toast';
import ImagePicker, { Image as ImageITF } from 'react-native-image-crop-picker';
// @ts-ignore
import CookieManager from 'react-native-cookie';
// @ts-ignore
import RNFileSelector from 'react-native-file-selector';
// @ts-ignore
import DatePicker from 'react-native-datepicker/datepicker';
import PdfView from 'react-native-pdf';
// 实验
import Adb from '~/utils/api/demo';
import Notifitation from '~/utils/notification';
import Adaptation from '~/utils/adaptation'; // 屏幕适配类
import LocationApi from '~/utils/api/location'; // 地址接口类
const adaptation = new Adaptation();

const Listdata = [
    {
        id: '1',
        code: '0224324344354',
        name: '丹参酮黄酸钠注射液',
        phNo: 122345676,
        amount: '1000袋',
    },
    {
        id: '2',
        code: '0224324344354',
        name: '丹参酮黄酸钠注射液',
        phNo: 122345676,
        amount: '1000袋',
    },
    {
        id: '3',
        code: '0224324344354',
        name: '丹参酮黄酸钠注射液',
        phNo: 122345676,
        amount: '1000袋',
    },
    {
        id: '4',
        code: '0224324344354',
        name: '丹参酮黄酸钠注射液',
        phNo: 122345676,
        amount: '1000袋',
    },
    {
        id: '5',
        code: '0224324344354',
        name: '丹参酮黄酸钠注射液',
        phNo: 122345676,
        amount: '1000袋',
    },
];
export default class Demo extends React.Component<any, any> {
    private focusEvent: any = null; //焦点监听事件
    public constructor(props: any) {
        super(props);
        this.state = {
            barCode: '',
            showIndex: 0,
            selectId: '',
            datetime: '',
            pdfPath: '',
            sections: [
                {
                    title: 'Title1',
                    isShow: false,
                    children: [
                        {
                            id: '1',
                            code: '0224324344354',
                            name: '丹参酮黄酸钠注射液',
                            phNo: 122345676,
                            amount: '1000袋',
                        },
                        {
                            id: '2',
                            code: '0224324344354',
                            name: '丹参酮黄酸钠注射液',
                            phNo: 122345676,
                            amount: '1000袋',
                        },
                    ],
                    data: [],
                },
                {
                    title: 'Title2',
                    isShow: false,
                    children: [],
                    data: [
                        {
                            id: '3',
                            code: '0224324344354',
                            name: '丹参酮黄酸钠注射液',
                            phNo: 122345676,
                            amount: '1000袋',
                        },
                        {
                            id: '4',
                            code: '0224324344354',
                            name: '丹参酮黄酸钠注射液',
                            phNo: 122345676,
                            amount: '1000袋',
                        },
                    ],
                },
                {
                    title: 'Title3',
                    isShow: false,
                    children: [
                        {
                            id: '5',
                            code: '0224324344354',
                            name: '丹参酮黄酸钠注射液',
                            phNo: 122345676,
                            amount: '1000袋',
                        },
                    ],
                    data: [],
                },
            ],
        };
    }
    public componentDidMount() {
        CookieManager.get(Path.BASE_URL).then((res: any) => {
            console.log('CookieManager.get =>', res); // => 'user_session=abcdefg; path=/;'
        });
        // 初始化扫描服务
        ScanBarCode.init();
        // 监听扫描服务
        ScanBarCode.listenerScan((event) => {
            console.log(event.barCode);
            this.setState({
                barCode: event.barCode,
            });
        });
        this.req();
        // 本地推送
        Notifitation.localNotification({
            title: 'MEs',
            message: 'message',
            subText: 'subText',
            bigText: 'bigText',
            time: 1000 * 10,
            callback: (notification) => {
                console.log('ldsb', notification);
            },
        });
        // 监听获取焦点事件
        this.focusEvent = this.props.navigation.addListener('focus', () => {
            console.log('focus');
        });
    }
    public componentWillUnmount() {
        // 移除事件监听
        // if (this.focusEvent) {
        //     this.focusEvent.remove();
        // }
    }
    // 发送网络请求
    private req = async () => {
        let a = await Adb.requestb('/asdsad/', { a: [1, 2, 3] });
        console.log(a);
    };
    // 获取轮播图中显示图片的索引
    private setShowIndex = (index: number) => {
        this.setState({
            showIndex: index,
        });
    };
    // 点击轮播图
    private gotoDetail = () => {
        console.log(this.state.showIndex);
    };
    // 滑动删除选中行
    private selectRow = (id: number | string) => {
        this.setState({
            selectId: id,
        });
    };
    // 选择文件
    private selectFile = async () => {
        const acceptFile = [
            'ttf',
            'pdf',
            'doc',
            'docx',
            'xls',
            'xlsx',
            'ppt',
            'pptx',
            'txt',
            'rar',
            'zip',
            'PDF',
            'DOC',
            'DOCX',
            'XLS',
            'XLSX',
            'PPT',
            'PPTX',
            'TXT',
            'RAR',
            'ZIP',
        ];
        IbatchPharmaPermissions.getPermissions({
            permissions: IbatchPharmaPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            blockedTitle: '你别拒绝了',
            successCallBack: () => {
                let filterFile;
                //文件夹内容筛选IOS和安卓是相反的，要注意
                if (Platform.OS === 'ios') {
                    filterFile = [
                        'log',
                        'LOG',
                        'HTML',
                        'html',
                        'js',
                        'JS',
                        'bat',
                        'BAT',
                        'class',
                        'CLASS',
                        'java',
                        'JAVA',
                        'PRO',
                        'pro',
                        'sql',
                        'SQL',
                    ];
                } else if (Platform.OS === 'android') {
                    filterFile =
                        '.+(.pdf|.PDF|.doc|.DOC|.DOCX|.docx|.xls|.xlsx|.XLS|.XLSX|.ppt|.PPT|.PPTX|.pptx|.txt|.TXT|.rar|.RAR|.zip|.ZIP|.ttf|.TTF)$';
                }
                //文档目录
                RNFileSelector.Show({
                    title: '选择文件',
                    closeMenu: true,
                    visible: true,
                    filter: filterFile,
                    onDone: async (path: string) => {
                        // android上通过'react-native-file-selector获取的path是不包含file://'协议的，
                        // android上需要拼接协议为'file://'+ path，而IOS则不需要
                        let reqPath = Platform.OS === 'ios' ? path : `file://${path}`;
                        let fileArr = path.split('.');
                        console.log(fileArr, path);
                        if (fileArr.length > 1 && acceptFile.indexOf(fileArr[fileArr.length - 1]) !== -1) {
                            // RNFS模块方法
                            //    获取文件属性
                            let fileState = await RNFS.stat(path);
                            console.log('RNFS.stat', fileState);
                            //    读取文件内容
                            let fileStr = await RNFS.readFile(reqPath, 'base64');
                            console.log('RNFS.readFile', fileStr);
                            let fileSize = Number(fileState.size);
                            //  获取共享/外部存储设备上应用程序特定目录的绝对路径
                            let pubDir = await RNFS.getAllExternalFilesDirs();
                            console.log(pubDir);
                            // 删除文件
                            // await RNFS.unlink(path);
                            // 文件大小小于5Mb;
                            if (fileArr[fileArr.length - 1] === 'pdf') {
                                this.setState({
                                    pdfPath: reqPath,
                                });
                                console.log(reqPath);
                            }
                            if (fileSize != 0 && fileSize <= 5 * 1024 * 1024) {
                                let files = [];
                                files.push({
                                    url: reqPath,
                                    type: 'multipart/form-data;charset=utf-8',
                                    name: encodeURIComponent(fileArr[0]),
                                    fileType: fileArr[1],
                                });
                                Adb.upload('asdsad', files);
                            } else {
                                let toast = Toast.show('文件大小不能超过5M', {
                                    duration: Toast.durations.LONG,
                                    position: Toast.positions.BOTTOM,
                                    delay: 10,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                    onShow: () => {
                                        // calls on toast\`s appear animation start
                                    },
                                    onShown: () => {
                                        // calls on toast\`s appear animation end.
                                    },
                                    onHide: () => {
                                        // calls on toast\`s hide animation start.
                                    },
                                    onHidden: () => {
                                        // calls on toast\`s hide animation end.
                                    },
                                });
                            }
                        } else {
                            let toast = Toast.show('暂不支持上传此扩展名的文件', {
                                duration: Toast.durations.LONG,
                                position: Toast.positions.BOTTOM,
                                delay: 10,
                            });
                        }
                    },
                    onCancel: () => {
                        console.log('cancelled');
                    },
                });
            },
        });
    };

    // 渲染分组头部
    private renderSectionHeader = ({ section }: { section: Section }) => {
        let { title } = section;
        return (
            <IbatchPharmaButton text="title" touchableType="highlight" onPress={this.showSection.bind(this, section)} disabled={true}>
                <View key={title} style={{ backgroundColor: 'red', height: 20 }}>
                    <Text>{title}</Text>
                </View>
            </IbatchPharmaButton>
        );
    };

    // 选择图片
    private selectImage = async () => {
        let height = adaptation.setH(130);
        let width = adaptation.setW(130);
        let avatarObj = (await ImagePicker.openPicker({
            width,
            height,
            cropping: true,
        })) as ImageITF;
        console.log(avatarObj);
    };
    private showSection = (section: Section) => {
        let { isShow, title } = section;
        if (isShow) {
            this.state.sections[0].data = [];
            this.setState({
                sections: this.state.sections,
            });
            this.state.sections[0].isShow = false;
        } else {
            this.state.sections[0].data = section.children;
            this.state.sections[0].isShow = true;
            this.setState({
                sections: this.state.sections,
            });
        }
    };

    public render() {
        const source = { uri: this.state.pdfPath, catch: false };
        return (
            <ViewPager style={{ flex: 1 }}>
                <View style={{ flex: 1 }} key="0">
                    {/* 自定义组件 */}
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.headerBox}>
                            <Text style={styles.headerText}>自定义组件</Text>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>全局按钮组件</Text>
                            </View>
                            <IbatchPharmaButton
                                text="按钮"
                                touchableType="highlight"
                                onPress={() => {
                                    console.log('点击');
                                }}
                            />
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>全局输入框组件</Text>
                            </View>
                            <IbatchPharmaInput
                                inputType="text"
                                placeholder="文本输入"
                                getOutput={(value) => {
                                    console.log(value);
                                }}
                                defaultValue={this.state.barCode}
                            />
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>全局手风琴组件</Text>
                            </View>
                            <Accordion linkage={true} selectIndex={0} openAmimate={true}>
                                <Accordion.Panel title="你好">
                                    <Text>1</Text>
                                </Accordion.Panel>
                                <Accordion.Panel title="阿西">
                                    <Text>4</Text>
                                </Accordion.Panel>
                                <Accordion.Panel title="阿西">
                                    <Text>4</Text>
                                </Accordion.Panel>
                            </Accordion>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>全局列表组件</Text>
                            </View>
                            <List data={Listdata} itemHeight={10} initialNumToRender={1}>
                                <ListItem />
                            </List>
                        </View>
                        <View>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>全局列表分组组件</Text>
                            </View>
                            <ListSection
                                sections={this.state.sections}
                                initialNumToRender={1}
                                renderSectionHeader={this.renderSectionHeader}>
                                <ListItem />
                            </ListSection>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>条码扫描组件</Text>
                            </View>
                            <IbatchPharmaButton
                                text="扫描"
                                touchableType="highlight"
                                onPress={() => {
                                    ScanBarCode.starScan();
                                }}
                            />
                            <IbatchPharmaInput
                                inputType="text"
                                placeholder="条码值"
                                getOutput={(value) => {
                                    console.log(value);
                                }}
                                defaultValue="1231"
                            />
                        </View>
                        <View>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>选择弹窗组件</Text>
                            </View>
                            <IbatchPharmaButton
                                text="选择位置"
                                touchableType="highlight"
                                onPress={async () => {
                                    let res = await LocationApi.queryLocation();
                                    let data = res.data;
                                    if (data) {
                                        PopSelection.show(true, {
                                            title: '请选择位置',
                                            data: data.nodes, // 要渲染的数据
                                            tag: 'barcode',
                                            renderItem: (item: any) => (
                                                <View
                                                    style={{
                                                        height: adaptation.setH(80),
                                                        justifyContent: 'center',
                                                        paddingLeft: adaptation.setW(40),
                                                    }}>
                                                    <Text>{item.cn}</Text>
                                                </View>
                                            ), // 子节点
                                            itemHeight: adaptation.setH(80), // 子节点高度
                                            clikcItem: (item: any) => {
                                                console.log(item);
                                            },
                                        });
                                    }
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }} key="1">
                    {/* 第三方组件 */}
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.headerBox}>
                            <Text style={styles.headerText}>第三方组件</Text>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>轮播图</Text>
                            </View>
                            <Swiper
                                containerStyle={styles.wrapper}
                                autoplay={true}
                                // autoplayTimeout={3}
                                dotStyle={{ bottom: -20 }}
                                activeDotStyle={{ bottom: -20 }}
                                onIndexChanged={this.setShowIndex}>
                                <TouchableWithoutFeedback onPress={this.gotoDetail}>
                                    <Image style={styles.banner} source={require('../../assets/images/banner1.jpg')} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.gotoDetail}>
                                    <Image style={styles.banner} source={require('../../assets/images/banner2.jpg')} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.gotoDetail}>
                                    <Image style={styles.banner} source={require('../../assets/images/banner3.jpg')} />
                                </TouchableWithoutFeedback>
                            </Swiper>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>滑动删除</Text>
                            </View>
                            <List data={Listdata} showNum={1} itemHeight={40}>
                                <SliderItem onOpen={this.selectRow} selectId={this.state.selectId} />
                            </List>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>时间选择组件</Text>
                            </View>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.datetime}
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                showIcon={false}
                                onDateChange={(datetime: string) => {
                                    this.setState({ datetime: datetime });
                                }}
                            />
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>文件选择</Text>
                            </View>
                            <Button title="选择文件" onPress={this.selectFile} />
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>PDF预览</Text>
                            </View>
                            <PdfView
                                source={source} // 文件地址（支持本地、远程）
                                style={{ height: 400 }}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    // 加载完成
                                    console.log(`number of pages: ${numberOfPages}`);
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    // 页数变更
                                    console.log(`current page: ${page}`);
                                }}
                                onError={(error) => {
                                    // 发生错误时
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    // 点击链接
                                    console.log(`Link presse: ${uri}`);
                                }}
                                onPageSingleTap={(page) => {
                                    // 点击当前页
                                    console.log(`click page: ${page}`);
                                }}
                                enableAntialiasing={true} // 仅在屏幕上显示一页
                                page={2} // 显示页码
                                scale={1}
                                minScale={1.0}
                                maxScale={1.0}
                                horizontal={false}
                                activityIndicator={() => <ActivityIndicator size="large" color="#0000ff" />} // 加载指示器
                            />
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.labelBox}>
                                <Text style={styles.labelText}>图片选择</Text>
                            </View>
                            <IbatchPharmaButton text="按钮" touchableType="highlight" onPress={this.selectImage} />
                        </View>
                    </ScrollView>
                </View>
            </ViewPager>
        );
    }
}

class ListItem extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        // 可从此处获取List传入的属性
        let { id, code } = this.props;
        return (
            <View>
                <Text>{id}</Text>
                <Text>{code}</Text>
            </View>
        );
    }
}
interface SliderItemProps {
    selectId: string | number;
    onOpen: (id: string | number) => void;
    [x: string]: any;
}

class SliderItem extends React.Component<SliderItemProps> {
    constructor(props: SliderItemProps) {
        super(props);
    }
    render() {
        let { code, name, phNo, amount, id, selectId, onOpen } = this.props;
        let BtnsLeft: SwipeoutButtonProperties[] = [
            { text: '清空', type: 'delete', onPress: () => console.log('清空列表') },
        ];
        let BtnsRight: SwipeoutButtonProperties[] = [
            { text: '删除', type: 'delete', onPress: () => console.log('删除单行数据') },
        ];
        return (
            <SliderBox uniqueVal={id} BtnsLeft={BtnsLeft} BtnsRight={BtnsRight} selectId={selectId} onOpen={onOpen}>
                <View>
                    <Text>{code}</Text>
                </View>
            </SliderBox>
        );
    }
}

const styles = StyleSheet.create({
    headerBox: {
        height: 40,
        backgroundColor: '#ccc',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 40,
        textAlign: 'center',
    },
    itemBox: {
        marginTop: 5,
    },
    labelBox: {
        marginBottom: 5,
        paddingLeft: 15,
        height: 30,
        backgroundColor: '#ddd',
    },
    labelText: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 30,
    },
    wrapper: {
        height: 167,
        flex: 0,
    },
    banner: {
        width: '100%',
        height: 140,
    },
});
