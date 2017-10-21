import axios from 'axios'
import Validate from 'vee-validate'
import Vuetify from 'vuetify'

axios.defaults.baseURL = process.env.API

const install = (Vue) => {
  Vue.use(Validate)
  Vue.use(Vuetify)
}

export default install
