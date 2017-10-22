import * as types from '@store/types'
import axios from 'axios'

const state = {
  student: {
    nome: '',
    statusPagamento: '',
    media: '',
    telefone: '',
    pesquisaCientifica: '',
    login: {
      email: '',
      password: ''
    },
    confirmation: '',
    nivel: 0,
    ouro: 0,
    gemas: 0
  }
}

const getters = {
  [types.STUDENT]: (state) => {
    return state.student
  }
}

const mutations = {
  [types.STUDENT]: (state, payload) => {
    state.student = payload
  }
}

const actions = {
  [types.STUDENT]: async ({ commit }, payload) => {
    const { data: student } = await axios.get(`/estudante/${payload}/`)
    commit(types.STUDENT)
  }
}

export default { state, getters, mutations, actions }
