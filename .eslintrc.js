module.exports = {
  extends: ['@gpa-lab/eslint-config', '@gpa-lab/eslint-config/react'],
  rules: {},
  env: {
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: '*.test.js',
      rules: {
        'no-unused-expressions': 'off',
        'import/no-unresolved': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          blocks: './public/blocks',
          metabox: './admin/metabox/ui',
          styles: './styles'
        }
      }
    }
  }
};
