const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

const env = process.env.NODE_ENV

const isEnvDev = env === 'development'

// style files regexes
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

const appSrc = paths.appSrc
const clientEnvironment = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))

module.exports = {
  entry: paths.appSrcIndex,
  output: {
    filename: isEnvDev ?  'static/js/[name].js' : 'static/js/[name].[contenthash:8].js',
    path: paths.appDist,
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: cssRegex,
        enforce: 'pre',
        include:[appSrc],
        use:[
          isEnvDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: sassRegex,
        enforce: 'pre',
        include:[appSrc],
        use:[
          isEnvDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        include:[appSrc],
        use: [
          // 'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          }
        ]
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          }
        },
        generator:{
          filename:'static/images/[name].[contenthash:6][ext]'
        },
      },
      {
        test:/\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{
          filename:'static/fonts/[name].[contenthash:6][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        generator:{
          filename:'static/media/[name].[contenthash:6][ext]',
        },
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject:true,
      favicon: 'public/favicon.ico'
    }),
    new webpack.DefinePlugin(clientEnvironment.stringified),
  ],
  resolve:{
    extensions: ['.js', '.tsx', '.ts'],
    alias:{
      src: paths.appSrc,
      services: paths.appServices,
      components: paths.appComponents,
      hooks: paths.appHooks,
      interfaces: paths.appInterfaces,
      libs: paths.appLibs,
      pages: paths.appPages,
      utils: paths.appUtils,
      routers: paths.appRouters,
      styles: paths.appStyles,
      assets:paths.appAssets
    },
    modules: [paths.appNodeModules],
  },
  // 开启webpack持久化存储缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}
