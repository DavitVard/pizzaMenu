import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pizzaSize:0,
    subButton:false
  },
  mutations: {
    setPriceSize(state,data){
      state.pizzaSize = data
    },
    setStatusButton(state,data){
      state.subButton = data
    },
  },
  getters:{
    getPriceSize : state => {
      return state.pizzaSize
    },
    orderButton : state => {
      return state.subButton
    },
  },
  actions: {
  },
  modules: {
  }
})
