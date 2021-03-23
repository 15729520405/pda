module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'babel-plugin-root-import',
            {
                rootPathPrefix: '~',
                rootPathSuffix: './',
            },
        ],
    ],
    env: {
        production: {
            plugins: ['transform-remove-console'], // 编译时删除console
        },
        development: {},
    },
};
