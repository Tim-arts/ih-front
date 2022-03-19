module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'html'],
  rules: {
    semi: ['warn', 'never'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'new-cap': 'off',
    'require-jsdoc': 'off',
    'prettier/prettier': ['error', { singleQuote: true }],
  },
}
