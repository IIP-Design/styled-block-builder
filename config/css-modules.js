const getCssModuleNames = mode => {
  const moduleName = mode === 'development'
    ? '[name]-[local]'
    : 'gpalab-[local]-[hash:base64:5]';

  return moduleName;
};

module.exports = {
  getCssModuleNames,
};
