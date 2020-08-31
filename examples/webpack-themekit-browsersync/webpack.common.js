const path = require('path')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

const entry = {
  'index': './src/scripts/index.js',
  'theme': './src/styles/theme.scss',
  'gift-card': './src/styles/gift-card.scss',
}


module.exports = {
  target: 'web',
  entry: entry,
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({filename: '[name].css',}),
    new StylelintPlugin({}),
  ],
  output: {
    path: path.resolve(__dirname, 'src/theme/assets/'),
    filename: '[name].js'
  },
  resolve: {
    // You can also add other formats such as JSX of react 
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true,
        },
      },
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(),
              ]
            }
          },
          'sass-loader'
        ],
      },
    ]
  },
  externals: {
    // load some external vendors here
    // examples of tyhis may scripts that you are including from a  CDN 
    // jQuery ( blergh) or a lazyloading library
  }
}