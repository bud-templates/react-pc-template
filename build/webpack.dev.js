'use strict'

process.env.NODE_ENV = 'development'

const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const paths = require('./paths')
const openBrowser = require('./utils/openBrowser')
const WebpackDevServer = require('webpack-dev-server')

const host = '127.0.0.1'
const port = 3005

const devConfig = merge(baseConfig, {
  mode: 'development',
  // devServer: {},// 配置放到了下面的new WebpackDevServer
  // 本地开发首次打包慢点没关系，因为 eval 缓存的原因，热更新会很快; cheap:只需要定位到行;module:能找到源代码而不是打包后的
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    // 开启react模块热替换插件
    new ReactRefreshWebpackPlugin(),
  ],
})

const devServer = new WebpackDevServer(
  {
    port,
    open: false,
    compress: false, // gzip压缩，开发环境不开启，提升热更新速度
    // 解决history路由跳转404问题
    historyApiFallback: true,
    hot: true,
    setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    static: {
      //托管静态资源文件
      directory: paths.appPublic,
    },
    // headers: { "Access-Control-Allow-Origin": "*" },
  },
  webpack(devConfig),
)

devServer.start().then(() => {
  openBrowser(`http://${host}:${port}`)
})

module.exports = devConfig
