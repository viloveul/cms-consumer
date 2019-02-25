import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/services/state'
import getters from '@/services/getters'
import actions from '@/services/actions'
import mutations from '@/services/mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
