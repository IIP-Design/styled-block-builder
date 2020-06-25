module.exports = {
  extends: ['@gpa-lab/eslint-config', '@gpa-lab/eslint-config/react'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-child-element-spacing': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'both',
        controlComponents: ['ReactQuill'],
        depth: 3
      }
    ],
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
