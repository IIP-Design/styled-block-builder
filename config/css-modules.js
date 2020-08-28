const getCssModuleNames = mode => {
  const moduleName = mode === 'development'
    ? '[name]-[local]'
    : 'gpalab-[hash:base64]';

  return moduleName;
};

module.exports = {
  getCssModuleNames,
};
