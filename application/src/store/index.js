import Vue from 'vue'
import Vuex from 'vuex'

import market from './market'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    market
  }
})

export default store
