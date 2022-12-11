import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    users: [],
    usersCount: ''
  },
  getters: {},
  mutations: {
    SET_USERS (state, payload) {
      state.users = payload
    },
    SET_USERS_COUNT (state, payload) {
      state.usersCount = payload
    }
  },
  actions: {
    async getAllUsers ({ commit }, state) {
      const response = await $http.Authentication({
        method: 'GET',
        url: '/users'
      })
      commit('SET_USERS', response.data?.data)
      commit('SET_USERS_COUNT', response.data?.data.length)
      return response
    },
    async createUser ({ commit }, payload) {
      const response = await $http.Authentication({
        method: 'POST',
        url: '/users',
        data: payload
      })
      return response
    },
    async updateUser ({ commit }, payload) {
      const response = await $http.Api({
        method: 'PUT',
        url: `/user-change/${payload.userId}`,
        data: payload.user
      })
      return response
    },
    async deleteUser ({ commit }, payload) {
      const response = await $http.Authentication({
        method: 'DELETE',
        url: `/users/${payload}`
      })
      return response
    }
  }
}
