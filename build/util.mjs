import util from 'util'
import webpack from 'webpack'
import rimraf from 'rimraf'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import globals from './globals'

const { __dirname, CSS_EXTRACT } = globals

export const build = util.promisify(webpack)

export const exclude = util.promisify(rimraf)

export const resolve = (...paths) => path.resolve(__dirname, '../', ...paths)

export const resolveAssets = (...paths) => path.posix.join('static', ...paths)

export const generateStyleLoader = (...loaders) => {
  if (CSS_EXTRACT) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  }

  return ['vue-style-loader'].concat(loaders)
}
