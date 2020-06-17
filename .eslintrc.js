module.exports = {
  extends: ['@gpa-lab/eslint-config', '@gpa-lab/eslint-config/react'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-child-element-spacing': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          blocks: './public/blocks',
          metabox: './admin/metabox/ui',
          styles: './styles',
        },
      },
    },
  },
};
