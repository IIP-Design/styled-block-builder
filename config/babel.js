const paths = require( './paths' );

/**
 * Sets the project Babel configuration.
 *
 * @param {string} cssModuleNames   The desired scoped CSS class name format.
 * @returns {Object}                A Babel configuration object.
 */
const setBabelConfig = cssModuleNames => {
  const isTest = String( process.env.NODE_ENV ) === 'test';

  return {
    presets: [
      ['@babel/preset-env', { modules: isTest ? 'commonjs' : false }],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-optional-chaining',
      [
        'babel-plugin-react-css-modules',
        {
          filetypes: {
            '.scss': {
              plugins: ['postcss-nested'],
              syntax: 'postcss-scss',
            },
          },
          generateScopedName: cssModuleNames,
        },
      ],
      [
        'babel-plugin-module-resolver',
        {
          alias: {
            blocks: './public/blocks',
            config: './config',
            library: './public/component-library',
            metabox: './admin/metabox/ui',
            styles: './styles',
          },
          extensions: [
            '.js', '.jsx', '.css', '.scss',
          ],
          root: [paths.pluginRoot],
        },
      ],
    ],
  };
};

module.exports = {
  setBabelConfig,
};
