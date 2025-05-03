const webpack = require('webpack');

module.exports = function override(config) {
 config.resolve.fallback = {
    ...config.resolve.fallback,
    "url": require.resolve("url")
  };
  
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "url": require.resolve("url")
  };
  
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "buffer": require.resolve("buffer/")
  };
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "buffer": require.resolve("buffer/")
  };
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "buffer": require.resolve("buffer/")
  };
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "url": require.resolve("url")
  };
  
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "url": require.resolve("url")
  };
  
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "url": require.resolve("url")
  };
  
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /^node:/,
      (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }
    ),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
