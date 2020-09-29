module.exports = {
  'extends': ['@gpa-lab/eslint-config', '@gpa-lab/eslint-config/react'],
  ignorePatterns: [
    'dist/', 'node_modules/', 'vendor/',
  ],
  parser: 'babel-eslint',
  rules: {
    'react/no-danger': 'warn',
    'react/jsx-child-element-spacing': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'both',
        controlComponents: ['ReactQuill'],
        depth: 3,
      },
    ],
    'node/no-missing-import': 'off',
    'node/no-unpublished-require': [
      'error', {
        allowModules: ['@testing-library/react', '@axe-core/react'],
      },
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
