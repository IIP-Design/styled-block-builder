const paths = require( './paths' );

const setBabelConfig = cssModuleNames => ( {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'babel-plugin-react-css-modules',
      {
        filetypes: {
          '.scss': {
            plugins: ['postcss-nested'],
            syntax: 'postcss-scss'
          }
        },
        generateScopedName: cssModuleNames
      }
    ],
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          blocks: './public/blocks',
          metabox: './admin/metabox/ui',
          styles: './styles'
        },
        extensions: ['.js', '.jsx', '.css', '.scss'],
        root: [paths.pluginRoot]
      }
    ]
  ]
} );

module.exports = {
  setBabelConfig
};
