import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './pages/login'
import Main from './pages/main'

import Index from './pages/index'
import Mall from './pages/mall'
import Player from './pages/player'

import CreateProxy from './pages/proxy/create'
import MyProxy from './pages/proxy/my'
import Account from './pages/proxy/account'
import Sell from './pages/proxy/sell'
import Performance from './pages/proxy/performance'
import DrawMoney from './pages/proxy/draw-money'

import Message from './pages/sys/message'
import GameSetup from './pages/sys/game'

import P404 from './pages/404'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: Main,
    children: [
      {
        path: '',
        component: Index
      }
    ]
  },
  {
    path: '/mall',
    component: Main,
    children: [
      {
        path: '',
        component: Mall
      }
    ]
  },
  {
    path: '/player',
    component: Main,
    children: [
      {
        path: '',
        component: Player
      }
    ]
  },
  {
    path: '/proxy',
    component: Main,
    children: [
      {
        path: 'create',
        component: CreateProxy
      },
      {
        path: 'my',
        component: MyProxy
      },
      {
        path: 'account',
        component: Account
      },
      {
        path: 'sell',
        component: Sell
      },
      {
        path: 'performance',
        component: Performance
      },
      {
        path: 'drawMoney',
        component: DrawMoney
      }
    ]
  },
  {
    path: '/sys',
    component: Main,
    children: [
      {
        path: 'message',
        component: Message
      },
      {
        path: 'game',
        component: GameSetup
      }
    ]
  },
  {
    path: '/404',
    component: P404
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})
