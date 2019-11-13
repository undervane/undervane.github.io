import { sleep } from '@/utils'

export const state = () => ({
  dark: false,
  position: { x: 0, y: 0 }
})

export const actions = {
  trigger({ commit, dispatch }, { pageX, pageY }) {
    commit('TOGGLE_DARK')
    commit('SET_POSITION', { x: pageX, y: pageY })
    dispatch('toggleHtmlColor')
  },
  toggleHtmlColor({ state }) {
    const html = document.getElementsByTagName('html')[0]
    state.dark
      ? (html.style.backgroundColor = '#191d4e')
      : (html.style.backgroundColor = '')
  },
  async calculate({ dispatch }) {
    const response = await fetch('https://is-day.now.sh')

    if (!response.ok) {
      return
    }

    const dayStatus = await response.json()

    if (!dayStatus.isDay) {
      await sleep(1500)

      const sun = document.getElementById('sun-core')

      if (sun === null || sun === undefined) {
        return
      }

      const { left, top, width, height } = sun.getBoundingClientRect()

      const position = { pageX: left + width / 2, pageY: top + height / 2 }

      dispatch('trigger', position)
    }
  }
}

export const mutations = {
  TOGGLE_DARK(state) {
    state.dark = !state.dark
  },
  SET_POSITION(state, position) {
    state.position = position
  }
}
