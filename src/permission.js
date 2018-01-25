import router from './router'
import store from './store'
import { getAuth } from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log(store.getters.getLoginUser)
  if (!(getAuth() === undefined)) {
    if (!(store.getters.getLoginUser.id === undefined)) {
      if (to.path === '/login') {
        next({path: '/index'})
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
  }
})

router.afterEach(() => {
})
