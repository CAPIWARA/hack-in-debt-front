import Vue from 'vue'
import Vuex from 'vuex'
import * as modules from '@store/modules'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules
})
