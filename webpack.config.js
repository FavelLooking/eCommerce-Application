module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  if (mode === 'production') {
    return require('./webpack.prod.config');
  }
  return require('./webpack.dev.config');
};
