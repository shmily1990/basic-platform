module.exports = {
  root: true,
  globals: {
    AMap: true,
    Stomp: true,
    AMapLoader: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'indent': ['error', 4],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ],
    'no-undef': 'off',
    camelcase: 'off',
    eqeqeq: 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-callback-literal': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
