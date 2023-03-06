const dotenv = require('dotenv')
const path = require('path')

const REACT_APP = /^REACT_APP_/i

const envConfig = dotenv.config({
  path: path.resolve(__dirname, '../env/.env.' + process.env.REACT_APP_ENV),
})

function getClientEnvironment() {
  const envs = { ...envConfig.parsed, ...process.env }
  const raw = Object.keys(envs)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = envs[key]
        return env
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
      },
    )
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {}),
  }
  return { raw, stringified }
}

module.exports = getClientEnvironment
