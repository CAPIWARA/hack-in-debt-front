import axios from 'axios'
import Validate from 'vee-validate'
import Vuetify from 'vuetify'
import store from '@store'
import { AUTH } from '@store/types'

axios.defaults.baseURL = process.env.API
axios.defaults.headers.Authorization = `Bearer ${store.getters[AUTH]}`

const install = (Vue) => {
  Vue.use(Validate)
  Vue.use(Vuetify)
}

export default install
