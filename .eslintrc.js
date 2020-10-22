module.exports = {
  'extends': ['@gpa-lab/eslint-config', '@gpa-lab/eslint-config/react'],
  ignorePatterns: [
    'dist/', 'node_modules/', 'public/component-library/lib/', 'vendor/',
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
    'node/no-unpublished-import': [
      'error', {
        allowModules: [
          '@axe-core/react', '@testing-library/react', 'prop-types',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          blocks: './public/blocks',
          config: './config',
          library: './public/component-library',
          metabox: './admin/metabox/ui',
          styles: './styles',
        },
      },
    },
  },
};
