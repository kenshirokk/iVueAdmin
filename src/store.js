import Vue from 'vue'
import Vuex from 'vuex'
import {getToken, setToken, removeToken} from '@/utils/auth'

Vue.use(Vuex)
const splitter = {
  namespaced: true,
  state: {
    open: false
  },
  mutations: {
    toggle(state, shouldOpen) {
      if (typeof shouldOpen === 'boolean') {
        state.open = shouldOpen
      } else {
        state.open = !state.open
      }
    }
  }
}

const auth = {
  namespaced: true,
  state: {
    loginUser: getToken() ? JSON.parse(getToken()) : {}
  },
  mutations: {
    setLoginUser(state, loginUser) {
      state.loginUser = loginUser
      setToken(loginUser)
    },
    loginOut(state) {
      state.loginUser = {}
      removeToken()
    }
  }
}

export default new Vuex.Store({
  modules: {
    splitter,
    auth
  },
  getters: {
    getLoginUser: (state) => {
      return state.auth.loginUser;
    }
  }
})
