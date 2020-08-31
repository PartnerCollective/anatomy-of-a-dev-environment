const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
/**
 * Minified Production Build
 */
const chunks = Object.assign({}, {
  cacheGroups: {
    commons: {
      test: /\.js$/,
      name: 'common',
      chunks: 'all'
    }
  }
})

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './src/theme/assets/'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks :  chunks,
  },
})