import Vue from 'vue'
import router from '@router'
import store from '@store'
import App from './App'
import Plugins from './plugins'

Vue.config.productionTip = false

Vue.use(Plugins)

const vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App }
})

export default vue
