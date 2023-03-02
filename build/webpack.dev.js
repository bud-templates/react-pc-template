'use strict'

process.env.NODE_ENV = 'development'


const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const paths = require('./paths')

module.exports = merge(baseConfig,{
  mode:'development',
  devServer:{
    port: 3005,
    compress: false, // gzip压缩，开发环境不开启，提升速度
    // 解决路由跳转404问题
    historyApiFallback: true,
    hot: true,
    static: { //托管静态资源文件
      directory: paths.appPublic,
    }
  },
  devtool: 'eval-cheap-module-source-map',
  plugins:[
    // 开启react模块热替换插件
    new ReactRefreshWebpackPlugin()
  ]
})
