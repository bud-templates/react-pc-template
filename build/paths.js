const path = require('path')
const fs = require('fs')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const reactAppEnv = process.env.REACT_APP_ENV
const publicPath = reactAppEnv !== 'prod' ? `bud-web3tool/${reactAppEnv}` : ''

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  process.env.NODE_ENV === 'production' ? publicPath : '',
  process.env.PUBLIC_URL,
)

module.exports = {
  publicUrlOrPath,
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appSrcIndex: resolveApp('src/index.tsx'),
  appServices: resolveApp('src/services'),
  appComponents: resolveApp('src/components'),
  appHooks: resolveApp('src/hooks'),
  appInterfaces: resolveApp('src/interfaces'),
  appLibs: resolveApp('src/libs'),
  appPages: resolveApp('src/pages'),
  appUtils: resolveApp('src/utils'),
  appStyles: resolveApp('src/styles'),
  appRouters: resolveApp('src/routers'),
  appWallet: resolveApp('src/wallet'),
  appAssets: resolveApp('src/assets'),
}
