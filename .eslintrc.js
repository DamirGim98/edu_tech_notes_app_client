module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'no-shadow': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'react/jsx-no-constructed-context-values': 0,
  },
}
