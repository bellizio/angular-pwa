var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngToolsWebpack = require('@ngtools/webpack');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var WorkboxPlugin = require('workbox-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');

const ENV = (process.env.NODE_ENV = process.env.ENV = 'production');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: '@ngtools/webpack',
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'assets', 'css'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        htmlLoader: {
          minimize: false // workaround for ng2
        }
      }
    }),
    new ExtractTextPlugin('assets/css/[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    new ngToolsWebpack.AngularCompilerPlugin({
      tsConfigPath: helpers.root('tsconfig.json'),
      entryModule: helpers.root('src', 'app', 'app.module#AppModule'),
      mainPath: helpers.root('src', 'main.ts')
    }),
    new WorkboxPlugin.GenerateSW({
      globDirectory: './dist',
      globPatterns: ['**/*.{html,js,css,jpg,jpeg,png,json}'],
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    }),
    new WebpackPwaManifest({
      name: 'Angular PWA',
      short_name: 'NG PWA',
      description: 'An Angular PWA starter kit with Workbox',
      background_color: '#ffffff',
      theme_color: '#000000',
      ios: true,
      icons: [
        {
          src: helpers.root('src', 'assets', 'images', 'hover.png'),
          sizes: [120, 152, 167, 180],
          destination: path.join('assets', 'images', 'ios'),
          ios: true
        },
        {
          src: helpers.root('src', 'assets', 'images', 'hover.png'),
          size: 1024,
          destination: path.join('assets', 'images', 'ios'),
          ios: 'startup'
        },
        {
          src: helpers.root('src', 'assets', 'images', 'hover.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('assets', 'images', 'android')
        }
      ]
    })
  ]
});
