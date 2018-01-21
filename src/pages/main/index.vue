<template>
    <v-ons-page>
      <v-ons-splitter>
        <v-ons-splitter-side width="150px" swipeable collapse="" side="left" :open.sync="openSide">
          <v-ons-page>
            <v-ons-list>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/index'">首页</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/mall'">商城管理</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/player'">玩家管理</router-link></v-ons-list-item>

              <v-ons-list-item @click="openSide = false"><router-link :to="'/proxy/create'">创建代理</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/proxy/my'">我的代理</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/proxy/account'">流水查询</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/proxy/sell'">出售记录</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/proxy/performance'">业绩查询</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/proxy/drawMoney'">提现审批</router-link></v-ons-list-item>

              <v-ons-list-item @click="openSide = false"><router-link :to="'/sys/message'">系统公告</router-link></v-ons-list-item>
              <v-ons-list-item @click="openSide = false"><router-link :to="'/sys/game'">游戏设置</router-link></v-ons-list-item>

            </v-ons-list>
          </v-ons-page>
        </v-ons-splitter-side>
        <v-ons-splitter-content>
          <router-view></router-view>
        </v-ons-splitter-content>
      </v-ons-splitter>
    </v-ons-page>
</template>

<script>
    import Bus from '@/bus'
    export default {
        name: "index",
        data() {
          return {
            openSide: false
          }
        },
        created() {
          Bus.$on('toggleSide', () => this.openSide = !this.openSide)
        }
    }
</script>

<style scoped>

</style>
