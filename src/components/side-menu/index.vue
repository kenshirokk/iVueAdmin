<template>
  <v-ons-splitter-side width="200px" swipeable collapse="" side="left" :open.sync="openSide">
    <v-ons-page>
      <div class="backgroundColor">
        <v-ons-list modifier="noborder">
          <v-ons-list-item modifier="nodivider" style="margin-top: 20px">
            <div class="left">
              <img :src="avatar" class="list-item__thumbnail">
            </div>
            <div class="center lh">
              {{nickname}}
            </div>
          </v-ons-list-item>
          <v-ons-list-item @click="openSide = false" modifier="nodivider">
            <div class="left2">
              <v-ons-icon icon="md-layers" class="list-item__icon"></v-ons-icon>
            </div>
            <router-link :to="'/index'">
              首页
            </router-link>
          </v-ons-list-item>
          <v-ons-list-item @click="openSide = false" modifier="nodivider">
            <v-ons-icon icon="md-shopping-cart" class="list-item__icon"></v-ons-icon>
            <router-link :to="'/mall'">商城管理</router-link>
          </v-ons-list-item>
          <v-ons-list-item @click="openSide = false" modifier="nodivider">
            <v-ons-icon icon="md-account" class="list-item__icon"></v-ons-icon>
            <router-link :to="'/player'">玩家管理</router-link>
          </v-ons-list-item>

          <v-ons-list-item modifier="nodivider" @click="toggleProxy">
            <v-ons-icon icon="md-globe" class="list-item__icon"></v-ons-icon>
            <div class="lh">代理管理</div>
          </v-ons-list-item>
          <transition name="slide-fade">
            <v-ons-list-item @click="openSide = false" modifier="nodivider" v-show="showProxy">
              <v-ons-list modifier="noborder">
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/create'">创建代理</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/my'">我的代理</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/account'">流水查询</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/sell'">出售记录</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/performance'">业绩查询</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/drawMoney'">提现审批</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/apply'">提现申请</router-link>
                </v-ons-list-item>
              </v-ons-list>
            </v-ons-list-item>
          </transition>
          <v-ons-list-item modifier="nodivider" @click="toggleSys">
            <v-ons-icon icon="md-settings" class="list-item__icon"></v-ons-icon>
            <div class=" lh">系统管理</div>
          </v-ons-list-item>
          <transition name="slide-fade">
            <v-ons-list-item modifier="nodivider" v-show="showSys">
              <v-ons-list modifier="noborder">
                <v-ons-list-item @click="openSide = false" tappable modifier="nodivider">
                  <router-link :to="'/sys/message'">系统公告</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" tappable modifier="nodivider">
                  <router-link :to="'/sys/game'">游戏设置</router-link>
                </v-ons-list-item>
              </v-ons-list>
            </v-ons-list-item>
          </transition>
        </v-ons-list>
        <v-ons-list modifier="noborder">
          <v-ons-list-item modifier="nodivider">
            <div class="center">
              <v-ons-button modifier="cta" style="margin: 6px 0" @click="loginOutUser">
                <v-ons-icon icon="fa-sign-out"></v-ons-icon>
                退出系统
              </v-ons-button>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-page>
  </v-ons-splitter-side>
</template>

<script>
  import Bus from '@/bus'
  import {mapGetters,mapMutations} from 'vuex'
  import { logout } from '@/api/login'

  export default {
    name: "index",
    data() {
      return {
        openSide: false,
        avatar: '',
        nickname: '',
        showProxy: false,
        showSys: false
      }
    },
    created() {
      Bus.$on('toggleSide', () => this.openSide = !this.openSide)

      let loginUser = this.getLoginUser()
      this.avatar = loginUser.avatar
      this.nickname = loginUser.nickname
    },
    methods: {
      ...mapGetters(['getLoginUser']),
      ...mapMutations('auth',['loginOut']),
      toggleProxy() {
        this.showProxy = !this.showProxy
      },
      toggleSys() {
        this.showSys = !this.showSys
      },
      loginOutUser() {
        logout().then(() => {
          this.loginOut();
          this.$router.push('/login')
       })
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: rgb(255, 255, 255);
  }

  .list-item__icon, .lh {
    color: rgb(255, 255, 255);
  }

  .router-link-active {
    color: rgb(64, 158, 255);
  }

  .backgroundColor, .page__background {
    background-color: rgb(48, 65, 86);
    height: 100%;
  }

  .list, .card {
    background-color: rgb(48, 65, 86);
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
