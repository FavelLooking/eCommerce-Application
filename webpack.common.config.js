const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions: ['tsx'] }),
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [{ from: '_redirects', to: './' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss|css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx$/i,
        use: 'ts-loader',
      },
    ],
  },
};
