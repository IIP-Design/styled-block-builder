const getCssModuleNames = mode => {
  const moduleName = mode === 'development'
    ? '[name]-[local]'
    : 'gpalab-[name]-[local]';

  return moduleName;
};

module.exports = {
  getCssModuleNames,
};
