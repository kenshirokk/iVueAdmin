import router from './router'
import store from './store'
import {getAuth} from '@/utils/auth'
import { getInfo } from '@/api/login'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log(store.getters.getLoginUser.id)
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
        this.setLoginUser(response.data.entity);
        this.$router.push('/index')
      }).catch(() => {
        next('/login')
      })
    }
  }
})

router.afterEach(() => {
})
