const webpack = require('webpack');
const merge = require('webpack-merge'); 
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: 8,
          compress: {
            inline: false,
            warnings: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          priority: 2000,
          enforce: true
        },
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.ClientURL': JSON.stringify(process.env.ClientURL),
      'process.env.ClientSecret': JSON.stringify(process.env.ClientSecret)
    })
  ]
})
