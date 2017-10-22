import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import cache from 'vuex-cache'

Vue.use(Vuex)

console.log(modules)

const store = new Vuex.Store({
  strict: true,
  plugins: [ cache ],
  modules
})

export default store
