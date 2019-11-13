export const state = () => ({
  notification: null
})

export const actions = {
  dispatch({ commit }, notification) {
    commit('SET_NOTIFICATION', notification)
  }
}

export const mutations = {
  SET_NOTIFICATION(store, notification) {
    store.notification = notification
  }
}
