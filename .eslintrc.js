// module.exports = {
//   root: false,
//   env: {
//     node: false,
//   },
//   extends: [
//     'plugin:vue/essential',
//     '@vue/airbnb',
//   ],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//   },
//   parserOptions: {
//     parser: 'babel-eslint',
//   },
// };
module.exports = {
  root: false,
  env: {
    node: false,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
