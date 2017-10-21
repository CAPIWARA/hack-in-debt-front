import Validate from 'vee-validate'
import axios from 'axios'

axios.defaults.baseURL = process.env.API

export default (Vue) => Vue.use(Validate)
