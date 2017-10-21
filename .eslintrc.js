module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  rules: {
    'indent': ['error', 2],
    'no-cond-assign': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/attribute-hyphenation': [2, 'always'],
    'vue/return-in-computed-property': [2, { 'treatUndefinedAsUnspecified': true }],
    'vue/no-dupe-keys': 2,
    'vue/html-self-closing': [2, {
      'html': {
        'normal': 'always',
        'void': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/html-quotes': [2, 'double']
  }
}
