<template>
  <v-ons-splitter-side width="200px" swipeable collapse="" side="left" :open.sync="openSide">
    <v-ons-page>
      <div class="backgroundColor">
      <v-ons-card>
        这里放用户名,头像,和其他信息
        等大神病好了来做
      </v-ons-card>
      <v-ons-list>
        <v-ons-list-item @click="openSide = false" modifier="material">
          <v-ons-icon icon="md-layers" class="list-item__icon"></v-ons-icon>
          <router-link :to="'/index'">
            首页
          </router-link>
        </v-ons-list-item>
        <v-ons-list-item @click="openSide = false" modifier="material">
          <v-ons-icon icon="md-shopping-cart" class="list-item__icon"></v-ons-icon>
          <router-link :to="'/mall'">商城管理</router-link>
        </v-ons-list-item>
        <v-ons-list-item @click="openSide = false" modifier="material">
          <v-ons-icon icon="md-account" class="list-item__icon"></v-ons-icon>
          <router-link :to="'/player'">玩家管理</router-link>
        </v-ons-list-item>

        <v-ons-list-item modifier="material">
          <v-ons-icon icon="md-globe" class="list-item__icon"></v-ons-icon>
          <div class=" lh">代理管理</div>
        </v-ons-list-item>
        <v-ons-list-item @click="openSide = false" modifier="material">
          <v-ons-list modifier="noborder">
            <v-ons-list-item @click="openSide = false" modifier="nodivider"><router-link :to="'/proxy/create'">创建代理</router-link></v-ons-list-item>
            <v-ons-list-item @click="openSide = false" modifier="nodivider"><router-link :to="'/proxy/my'">我的代理</router-link></v-ons-list-item>
            <v-ons-list-item @click="openSide = false" modifier="nodivider"><router-link :to="'/proxy/account'">流水查询</router-link></v-ons-list-item>
            <v-ons-list-item @click="openSide = false" modifier="nodivider"><router-link :to="'/proxy/sell'">出售记录</router-link></v-ons-list-item>
            <v-ons-list-item @click="openSide = false" modifier="nodivider"><router-link :to="'/proxy/performance'">业绩查询</router-link></v-ons-list-item>
            <v-ons-list-item @click="openSide = false" modifier="nodivider"><router-link :to="'/proxy/drawMoney'">提现审批</router-link></v-ons-list-item>
          </v-ons-list>
        </v-ons-list-item>

        <v-ons-list-item modifier="material">
          <v-ons-icon icon="md-settings" class="list-item__icon"></v-ons-icon>
          <div class=" lh">系统管理</div>
        </v-ons-list-item>
        <v-ons-list-item>
          <v-ons-list modifier="noborder">
            <v-ons-list-item @click="openSide = false" tappable modifier="nodivider"><router-link :to="'/sys/message'">系统公告</router-link></v-ons-list-item>
            <v-ons-list-item @click="openSide = false" tappable modifier="nodivider"><router-link :to="'/sys/game'">游戏设置</router-link></v-ons-list-item>
          </v-ons-list>
        </v-ons-list-item>
      </v-ons-list>
    </div>
    </v-ons-page>
  </v-ons-splitter-side>
</template>

<script>
  import Bus from '@/bus'
  import { mapGetters } from 'vuex'

  export default {
        name: "index",
        data() {
          return {
            openSide: false
          }
        },
        created() {
          Bus.$on('toggleSide', () => this.openSide = !this.openSide)

          this.getLoginUser()
        },
        methods:{
          ...mapGetters (['getLoginUser']),
        }
    }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: rgb(255, 255, 255);
  }
  .list-item__icon, .lh{
    color: rgb(255, 255, 255);
  }
  .router-link-active{
    color: rgb(64, 158, 255);
  }
  .backgroundColor, .list {
    background-color: rgb(48, 65, 86);
  }
</style>
