import router from './router'
import store from './store'
import {getAuth} from '@/utils/auth'
import { getInfo } from '@/api/login'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (store.getters.getLoginUser.id !== undefined) {
    if (to.path.indexOf('/login') !== -1) {
      next('/index')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      getInfo().then(response => {
        this.modalVisible = false
        store.commit('auth/setLoginUser', response.data.entity);
        next()
      }).catch(() => {
        next('/login')
      })
    }
  }
})

router.afterEach(() => {
})
