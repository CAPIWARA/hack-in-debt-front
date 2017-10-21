import * as types from '@store/types'

const state = {
  notifications: []
}

const getters = {
  [types.NOTIFICATIONS]: (state) => {
    const notifications = state.notifications
    return notifications
  }
}

const mutations = {
  [types.NOTIFICATIONS]: (state, payload) => {
    state.notifications = payload
  }
}

const actions = {
  [types.NOTIFICATIONS_INCLUDE]: ({ commit, getters }, payload) => {
    const isError = payload instanceof Error
    const notification = {
      type: payload.type || (isError ? 'error' : 'info'),
      message: payload.message || payload
    }
    const notifications = [...getters[types.NOTIFICATIONS], notification]

    commit(types.NOTIFICATIONS, notifications)
  },
  [types.NOTIFICATIONS_EXCLUDE]: ({ commit, getters }, payload) => {
    const notifications = getters[types.NOTIFICATIONS]
      .filter(notification => notification === payload)

    commit(types.NOTIFICATIONS, notifications)
  }
}

export default { state, getters, mutations, actions }
