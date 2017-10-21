import { resolve, resolveAssets, generateStyleLoader } from '../util'
import webpack from 'webpack'
import formatter from 'eslint-friendly-formatter'
import globals from '../globals'

const { JS_SOURCE_MAP, CSS_MINIFY, CSS_SOURCE_MAP, env } = globals

const rules = {
  css: {
    loader: 'css-loader',
    options: {
      sourceMap: CSS_SOURCE_MAP,
      minimize: !CSS_MINIFY ? false : {
        autoprefixer: false
      }
    }
  },
  scss: {
    loader: 'sass-loader',
    options: {
      sourceMap: CSS_SOURCE_MAP,
      data: '@import "~vue-convenia-components/src/style/reference.scss";'
    }
  }
}

const config = {
  entry: {
    main: ['babel-polyfill', resolve('src/')]
  },
  devtool: JS_SOURCE_MAP || false,
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@containers': resolve('src/containers'),
      '@router': resolve('src/router'),
      '@store': resolve('src/store'),
      '@styles': resolve('src/styles'),
      '@views': resolve('src/views'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: generateStyleLoader(rules.css)
      },
      {
        test: /\.scss$/,
        use: generateStyleLoader(rules.css, rules.scss)
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: { formatter }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: generateStyleLoader(rules.css, rules.scss),
            scss: generateStyleLoader(rules.css, rules.scss)
          },
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/vue-convenia-components')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolveAssets('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolveAssets('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolveAssets('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
}

export default config
