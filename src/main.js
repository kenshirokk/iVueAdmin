// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'font-awesome/css/font-awesome.css'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css'

import Vue from 'vue'
import $ons from 'vue-onsenui/esm'
import * as VOns from './vue-onsen-components'
import store from './store'
import router from './router'
import App from './App'
import '@/permission'
import appHead from '@/components/head'

Vue.config.productionTip = false

Vue.use($ons)
Vue.component('app-head',appHead)
Object.values(VOns).forEach(comp => Vue.component(comp.name, comp))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
