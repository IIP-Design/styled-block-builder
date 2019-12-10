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
    ]
  ]
} );

module.exports = {
  setBabelConfig
};
