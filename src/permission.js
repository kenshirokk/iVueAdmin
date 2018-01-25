import router from './router'
import store from './store'
import {getAuth} from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getAuth() && store.getters.getLoginUser.id !== undefined) {
    if (to.path.indexOf('/login') !== -1) {
      next('/index')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
})
