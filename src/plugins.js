import Util from 'vue-convenia-util'
import Components from 'vue-convenia-components'
import Validate, { Validator } from 'vee-validate'
import axios from 'axios'
import Rollbar from 'rollbar'

const logger = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: process.env.ROLLBAR_CAPTURE_UNCAUGHT,
  captureUnhandledRejections: process.env.ROLLBAR_CAPTURE_UNHANDLED,
  payload: {
    environment: process.env.NODE_ENV
  }
})

axios.defaults.baseURL = process.env.API

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.ROLLBAR_TOKEN) {
      logger.error(error)
    }

    return error
  }
)

export default (Vue) => {
  Util.integrate('vee-validate', Validator)

  Vue.use(Components)
  Vue.use(Validate)
  Vue.use(Util, {
    formatters: true,
    formatFilters: true
  })
}
