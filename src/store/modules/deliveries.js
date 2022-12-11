// import axios from 'axios'
import $http from '@/plugins/axios'

export default {
  namespaced: true,

  state: {
    deliveries: [],
    deliveriesCount: ''
  },
  getters: {
    getDeliveriesCount: (state) => {
      return state.deliveriesCount
    }
  },
  mutations: {
    SET_DELIVERIES (state, payload) {
      state.deliveries = payload
    },
    SET_DELIVERIES_COUNT (state, payload) {
      state.deliveriesCount = payload
    }
  },
  actions: {
    async getAllDeliveries ({ commit }) {
      const response = await $http.Api({
        method: 'GET',
        url: '/deliveries'
      })
      commit('SET_DELIVERIES', response.data?.data)
      commit('SET_DELIVERIES_COUNT', response.data?.data.length)
      return response
    },
    async getSellersDeliveries ({ commit }, payload) {
      const response = await $http.Api({
        method: 'GET',
        url: `/deliveries/deliveries/${payload}`
      })
      commit('SET_DELIVERIES', response.data?.data)
      commit('SET_DELIVERIES_COUNT', response.data?.data.length)
      return response
    },
    async createDelivery ({ commit }, payload) {
      const response = await $http.Api({
        method: 'POST',
        url: '/deliveries',
        data: payload
      })
      console.log('this is from createDelivery', response)

      return response
    },
    async updateDelivery ({ commit }, payload) {
      const response = await $http.Api({
        method: 'PUT',
        url: `/deliveries/${payload.deliveryId}`,
        data: payload.deliveries
      })
      console.log('data to update', payload.deliveries)
      console.log('id to update', payload.deliveryId)

      console.log('this is from updateDelivery', response)
      return response
    },
    async deleteDelivery ({ commit }, payload) {
      const response = await $http.Api({
        method: 'DELETE',
        url: `/deliveries/${payload}`
      })
      return response
    }
  }
}
