import { resolve, resolveAssets } from '../util'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import globals from '../globals'
import config from './base'

const { JS_MINIFY, JS_SOURCE_MAP, CSS_EXTRACT, HTML_MINIFY, CSS_MINIFY } = globals

const plugins = []

if (JS_MINIFY) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: !!JS_SOURCE_MAP
  }))
}

if (CSS_EXTRACT) {
  plugins.push(new ExtractTextPlugin({
    filename: resolveAssets('css/[name].[contenthash].css')
  }))
}

if (CSS_EXTRACT && CSS_MINIFY) {
  plugins.push(new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      safe: true
    }
  }))
}

export default merge(config, {
  output: {
    filename: resolveAssets('js/[name].[chunkhash].js'),
    chunkFilename: resolveAssets('js/[id].[chunkhash].js')
  },
  plugins: [
    ...plugins,
    new HtmlPlugin({
      filename: resolve('dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: !HTML_MINIFY ? false : {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // TODO: Rever essa estratégia.
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('node_modules')) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
})
