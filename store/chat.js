import { sleep } from '../utils'

export const state = () => ({
  open: false,
  firstLoad: true,
  disabled: true,
  hasDisconnected: false,
  placeholder: 'Write your name',
  messages: []
})

export const actions = {
  trigger({ commit }, { pageX, pageY }) {
    commit('TOGGLE_DARK')
    commit('SET_POSITION', { x: pageX, y: pageY })
  },

  toggleChat({ dispatch, state }) {
    state.open ? dispatch('closeChat') : dispatch('openChat')
  },

  openChat({ state, commit, dispatch }) {
    commit('SET_OPEN', true)

    if (state.firstLoad) {
      commit('SET_FIRST_LOAD', false)
      dispatch('addInitialMessages')
    }
  },

  closeChat({ commit }) {
    commit('SET_OPEN', false)
  },

  async reset({ commit, dispatch }) {
    commit('RESET')
    await sleep(600)
    dispatch('openChat')
  },

  addMessage({ commit }, message) {
    commit('ADD_MESSAGE', message)
  },

  setDisabled({ commit }, status) {
    commit('SET_DISABLED', status)
  },

  disconnected({ dispatch, commit }) {
    dispatch('setDisabled', true)
    dispatch('setPlaceholder', 'Not connected')
    commit('SET_HAS_DISCONNECTED', true)
  },

  setPlaceholder({ commit }, text) {
    commit('SET_PLACEHOLDER', text)
  },

  async addInitialMessages({ dispatch }) {
    const welcomeMessage = {
      text: "Hey! Thanks for coming over here, what's your name?",
      fromUser: false
    }

    const emoji = {
      text: '😊',
      fromUser: false
    }

    await sleep(500)
    dispatch('addMessage', welcomeMessage)

    await sleep(600)
    dispatch('addMessage', emoji)

    dispatch('setDisabled', false)
  }
}

export const mutations = {
  SET_FIRST_LOAD(state, status) {
    state.firstLoad = status
  },

  SET_HAS_DISCONNECTED(state, status) {
    state.hasDisconnected = status
  },

  RESET(state) {
    state.firstLoad = true
    state.disabled = true
    state.placeholder = 'Write your name'
    state.hasDisconnected = false
    state.messages = []
  },

  SET_OPEN(state, status) {
    state.open = status
  },

  SET_DISABLED(state, status) {
    state.disabled = status
  },

  SET_PLACEHOLDER(state, text) {
    state.placeholder = text
  },

  ADD_MESSAGE(state, message) {
    state.messages.push(message)
  }
}
