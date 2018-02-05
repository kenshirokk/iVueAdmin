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
              <v-ons-icon icon="md-home" class="list-item__icon"></v-ons-icon>
            </div>
            <router-link :to="'/index'">
              首页
            </router-link>
          </v-ons-list-item>
          <v-ons-list-item @click="openSide = false" modifier="nodivider" v-if="role == 1">
            <v-ons-icon icon="md-shopping-cart" class="list-item__icon"></v-ons-icon>
            <router-link :to="'/mall'">商城管理</router-link>
          </v-ons-list-item>
          <v-ons-list-item @click="openSide = false" modifier="nodivider">
            <v-ons-icon icon="md-account" class="list-item__icon"></v-ons-icon>
            <router-link :to="'/player'">玩家管理</router-link>
          </v-ons-list-item>

          <v-ons-list-item modifier="nodivider" @click="toggleProxy">
            <v-ons-icon icon="md-globe" class="list-item__icon"></v-ons-icon>
            <div class="lh">代理管理
              <span style="color: darkgray;margin-left: 20px;font-size: 10px"  v-if="showProxy">▲</span>
              <span style="color: darkgray;margin-left: 20px;font-size: 10px"  v-else >▼</span>
            </div>
          </v-ons-list-item>
          <transition name="slide-fade">
            <v-ons-list-item @click="openSide = false" modifier="nodivider" v-show="showProxy" class="child_list">
              <v-ons-list modifier="noborder">
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/create'">创建代理</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/my'">我的代理</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider" v-if="role < 3">
                  <router-link :to="'/proxy/account'">流水查询</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/sell'">充值记录</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider">
                  <router-link :to="'/proxy/performance'">业绩查询</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider" v-if="role == 1">
                  <router-link :to="'/proxy/drawMoney'">提现审批</router-link>
                </v-ons-list-item>
                <v-ons-list-item @click="openSide = false" modifier="nodivider" v-if="role != 1">
                  <router-link :to="'/proxy/apply'">提现申请</router-link>
                </v-ons-list-item>
              </v-ons-list>
            </v-ons-list-item>
          </transition>
          <v-ons-list-item modifier="nodivider" @click="toggleSys" v-if="role == 1">
            <v-ons-icon icon="md-settings" class="list-item__icon"></v-ons-icon>
            <div class=" lh">系统管理
              <span style="color: darkgray;margin-left: 20px;font-size: 10px"  v-if="showSys">▲</span>
              <span style="color: darkgray;margin-left: 20px;font-size: 10px"  v-else >▼</span>
            </div>
          </v-ons-list-item>
          <transition name="slide-fade" v-if="role == 1">
            <v-ons-list-item modifier="nodivider" v-show="showSys" class="child_list">
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
        <v-ons-list-item @click="openSide = false" modifier="nodivider">
          <v-ons-icon icon="fa-lock" class="list-item__icon"></v-ons-icon>
          <router-link :to="'/password'">修改密码</router-link>
        </v-ons-list-item>
        <v-ons-list modifier="noborder">
          <v-ons-list-item modifier="nodivider">
            <div class="center">
              <v-ons-button modifier="cta" style="margin: 6px 0" @click="loginOutUser">
                <v-ons-icon icon="fa-sign-out"></v-ons-icon>
                退出
              </v-ons-button>
              <v-ons-button modifier="cta" style="margin: 6px 10px" @click="toShare">
                <v-ons-icon icon="fa-share-alt"></v-ons-icon>
                分享
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
        role: '',
        showProxy: false,
        showSys: false,
        staticUrl: process.env.STATIC_URL,
      }
    },
    created() {
      Bus.$on('toggleSide', () => this.openSide = !this.openSide)

      let loginUser = this.getLoginUser()
      this.avatar = loginUser.avatar
      this.nickname = loginUser.nickname
      this.role = loginUser.agencyType;
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
      },
      toShare(){
        let loginUser = this.getLoginUser()
        window.location.href = this.staticUrl + '/' + loginUser.qrcode;
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: rgb(255, 255, 255);
  }
  .list-item__icon{
    width: 10px;
    height: 10px;
    margin-right: 10px;
    line-height: 12px;
  }
  .list-item__icon, .lh {
    color: rgb(255, 255, 255);
  }
  .child_list{
    background-color: #1f2d3d!important;
  }
  .child_list ons-list{
    background-color: #1f2d3d!important;
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
    transition: opacity .3s;
  }

  .slide-fade-leave-active {
    transition: opacity .3s;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
