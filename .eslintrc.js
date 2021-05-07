module.exports = {
  root: true,
  env: {
    node: true
  },
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
    eqeqeq: 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-callback-literal': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
