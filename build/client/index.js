import 'eventsource-polyfill'

import client from 'webpack-hot-middleware/client?noInfo=true&reload=true'

client.subscribe((event) => {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
