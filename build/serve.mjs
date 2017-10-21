import config from './config/serve'
import express from 'express'
import webpack from 'webpack'
import hotMiddleware from 'webpack-hot-middleware'
import devMiddleware from 'webpack-dev-middleware'
import historyApi from 'connect-history-api-fallback'
import globals from './globals'

const { PORT } = globals

const app = express()
const port = PORT
const compiler = webpack(config)

const hot = hotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
})

const dev = devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hot.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(historyApi())

// serve webpack bundle output
app.use(dev)

// enable hot-reload and state-preserving
// compilation error display
app.use(hot)

// serve pure static assets
app.use('/static', express.static('./static'))

const uri = 'http://0.0.0.0:' + port

console.log('> Starting dev server...')
dev.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

app.listen(port, '0.0.0.0')
