<template>
  <v-ons-page>
    <app-head title="首页"></app-head>

    <v-ons-card>
      <div class="title">
        个人信息
      </div>
      <v-ons-row>
        <v-ons-col>联系电话</v-ons-col>
        <v-ons-col>{{personalInfo.phone}}</v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>平台充值总收入</v-ons-col>
        <v-ons-col>{{personalInfo.totalIncome}}</v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>出售金币总数量</v-ons-col>
        <v-ons-col>{{personalInfo.coinSum}}</v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>出售房卡数量</v-ons-col>
        <v-ons-col>{{personalInfo.roomCardSum}}</v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>玩家总数量</v-ons-col>
        <v-ons-col>{{personalInfo.userCount}}</v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>代理总数量</v-ons-col>
        <v-ons-col>{{personalInfo.agencyCount}}</v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>在线玩家总数量</v-ons-col>
        <v-ons-col>{{personalInfo.onlineUserCount}}</v-ons-col>
      </v-ons-row>
    </v-ons-card>
    <v-ons-card>
      <div class="title">
      代理信息
      </div>
      <v-ons-list>
        <v-ons-list-item v-for="td in tableData" :key="td.id">
          <v-ons-row>
            <v-ons-col>代理ID</v-ons-col>
            <v-ons-col>{{td.id}}</v-ons-col>
          </v-ons-row>
          <v-ons-row>
            <v-ons-col>代理昵称</v-ons-col>
            <v-ons-col>{{td.nickname}}</v-ons-col>
          </v-ons-row>
          <v-ons-row>
            <v-ons-col>代理级别</v-ons-col>
            <v-ons-col>{{td.agencyType}}</v-ons-col>
          </v-ons-row>
          <v-ons-row>
            <v-ons-col>房卡余额</v-ons-col>
            <v-ons-col>{{td.roomCard}}</v-ons-col>
          </v-ons-row>
          <v-ons-row>
            <v-ons-col>金币余额</v-ons-col>
            <v-ons-col>{{td.coin}}</v-ons-col>
          </v-ons-row>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
  import {getMyList, getPersonalInfo} from '@/api/agency'

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        personalInfo: {}
      }
    },
    created() {
      this.getMyAgency();
      this.getPersonalInfo();
    },
    methods: {
      getMyAgency() {
        getMyList().then(response => {
          this.tableData = response.data.list
        })
      },
      getPersonalInfo() {
        getPersonalInfo().then(response => {
          this.personalInfo = response.data.entity
        })
      }
    }
  }
</script>

<style scoped>

</style>
