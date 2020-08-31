  
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  // When inspecting, files are unminified
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './src/theme/assets/'),
    publicPath: path.resolve(__dirname, '/'),
    inline: true,
    port: 8080,
    clientLogLevel: 'info',
    openPage: '_localserver/',
    liveReload: true,
    writeToDisk: true,
    // http2: true,
    // https: true,
  },
})