/**
 * Determines the scoped name format for CSS classes.
 *
 * @param {string} mode  One of 'production' or 'development' depending on what type of build is run.
 */
const getCssModuleNames = mode => {
  const moduleName = mode === 'development'
    ? '[name]-[local]'
    : 'gpalab-[hash:base64]';

  return moduleName;
};

module.exports = {
  getCssModuleNames,
};
