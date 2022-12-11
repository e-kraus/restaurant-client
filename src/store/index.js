import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products.js'
import system from './modules/system.js'
import orders from './modules/orders.js'
import users from './modules/users.js'
import deliveries from './modules/deliveries.js'
import authentication from './modules/authentication.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    products,
    system,
    deliveries,
    orders,
    users
  }
})
