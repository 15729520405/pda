module.exports = {
    root: true,
    extends: ['@react-native-community','prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    globals: {
        GLOBAL: 'writable',
    },
};
