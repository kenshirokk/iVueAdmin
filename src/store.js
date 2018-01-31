import Vue from 'vue'
import Vuex from 'vuex'

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

const mall = {
  namespaced: true,
  state: {
    pageStack: [],
    updateData: '',
  },
  mutations: {
    push(state, page) {
      state.pageStack.push(page)
    },
    back(state) {
      state.pageStack.pop()
    },
    prepareUpdate(state, updateData) {
      state.updateData = updateData
    },
    empty(state) {
      state.pageStack = []
    }
  }
}

const player = {
  namespaced: true,
  state: {
    pageStack: [],
    updateData: '',
  },
  mutations: {
    push(state, page) {
      state.pageStack.push(page)
    },
    back(state) {
      state.pageStack.pop()
    },
    prepareUpdate(state, updateData) {
      state.updateData = updateData
    },
    empty(state) {
      state.pageStack = []
    }
  }
}

const sysGame = {
  namespaced: true,
  state: {
    pageStack: [],
    updateData: '',
  },
  mutations: {
    push(state, page) {
      state.pageStack.push(page)
    },
    back(state) {
      state.pageStack.pop()
    },
    prepareUpdate(state, updateData) {
      state.updateData = updateData
    },
    empty(state) {
      state.pageStack = []
    }
  }
}

const sysMessage = {
  namespaced: true,
  state: {
    pageStack: [],
    updateData: ''
  },
  mutations: {
    push(state, page) {
      state.pageStack.push(page)
    },
    back(state) {
      state.pageStack.pop()
    },
    prepareUpdate(state, updateData) {
      state.updateData = updateData
    },
    empty(state) {
      state.pageStack = []
    }
  }
}

const auth = {
  namespaced: true,
  state: {
    loginUser: {}
  },
  mutations: {
    setLoginUser(state, loginUser) {
      state.loginUser = loginUser
    },
    loginOut(state) {
      state.loginUser = {}
    }
  }
}

export default new Vuex.Store({
  modules: {
    splitter,
    auth,
    mall,
    player,
    sysGame,
    sysMessage
  },
  getters: {
    getLoginUser: (state) => {
      return state.auth.loginUser;
    }
  }
})
