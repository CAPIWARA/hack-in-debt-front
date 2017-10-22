import * as types from '@store/types'
import axios from 'axios'

const state = {
  benefits: []
}

const getters = {
  [types.BENEFITS]: (state) => {
    return state.benefits
  }
}

const mutations = {
  [types.BENEFITS]: (state, payload) => {
    state.benefits = payload
  }
}

const actions = {
  [types.BENEFITS]: async ({ commit }) => {
    const { data: benefits } = await axios.get('/beneficio')
    commit(types.BENEFITS)
  }
}

export default { state, getters, mutations, actions }
