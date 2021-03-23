
let fs = require('fs');
let path = require('path');

// 获取原始icons json文件地址
let iconsJSONFile = path.resolve(__dirname, '../../icons-origin/iconfont.json');

// 获取原始ttf文件地址
let ttfFile = path.resolve(__dirname, '../../icons-origin/iconfont.ttf');

// 获取原始icons JSON-string
let iconsJSONString = fs.readFileSync(iconsJSONFile, 'utf-8');

// 格式化原始icons JSON
let iconsJSON = JSON.parse(iconsJSONString);

let arrangedJSON : any = {};

// 组装json数据
for(let i = 0; i < iconsJSON.glyphs.length; i++){
    let curIcon = iconsJSON.glyphs[i];
    arrangedJSON[curIcon.font_class] = curIcon.unicode_decimal;
}

// 输出到安卓地址
function outputToAndroid() {
    // 安卓 icons 文件输出地址
    let outputDir = path.resolve(__dirname, '../components/Icons');
    let ttfDir = path.resolve(__dirname, '../android/app/src/main/assets/fonts');

    // 拷贝ttf文件到安卓开发路径
    fs.copyFileSync(ttfFile, `${ttfDir}/mes-iconfont.ttf`);

    // 写入json文件
    fs.writeFileSync(`${outputDir}/mes-iconfont.json`, JSON.stringify(arrangedJSON), {encoding: 'utf-8'});

    console.log('字体文件导出完成！');
}

// 输出到IOS地址
function outputToIOS() {
    // IOS icons 文件输出地址
    let outputDir = path.resolve(__dirname, '');
}

outputToAndroid();