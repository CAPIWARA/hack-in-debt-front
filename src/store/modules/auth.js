import * as types from '@store/types'
import axios from 'axios'
import decode from 'jwt-decode'

const state = {
  auth: null
}

const getters = {
  [types.AUTH]: (state) => {
    const isAuth = !!state.auth
    return isAuth
  }
}

const mutations = {
  [types.AUTH]: (state, payload) => {
    state.auth = payload
    window.localStorage.setItem(types.AUTH, payload)
  }
}

const actions = {
  [types.AUTH_CHECK]: ({ commit, getters }) => {
    const auth = window.localStorage.getItem(types.AUTH)
    const isExpired = auth && (decode(auth).exp <= ~~(Date.now() / 1000))

    commit(types.AUTH, (auth && !isExpired) ? auth : '')

    if (isExpired) {
      throw Error('Acesso expirado, entre novamente.')
    }

    return !!getters[types.AUTH]
  },
  [types.AUTH_SIGNIN]: async ({ commit }, payload) => {
    const { headers } = await axios.post('/', payload)
    const authorization = headers.authorization || headers.Authorization

    if (!authorization) {
      throw Error('Erro ao entrar!')
    }

    const [ , auth ] = /Bearer (.*)$/.exec(authorization)

    commit(types.AUTH, auth)
  },
  [types.AUTH_SIGNOUT]: ({ commit }, payload) => {
    commit(types.AUTH, null)
  },
  [types.AUTH_SIGNUP]: async ({ commit }, payload) => {
    await axios.post('/instituicao', payload)
  }
}

export default { state, getters, mutations, actions }
