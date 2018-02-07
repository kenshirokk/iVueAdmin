<template>
  <v-ons-page>
    <app-head title="首页"></app-head>

    <v-ons-card class="app_list_row">
      <div class="title">
        个人信息
      </div>
      <v-ons-row>
        <v-ons-col>联系电话：</v-ons-col>
        <v-ons-col>{{personalInfo.phone}}</v-ons-col>
      </v-ons-row>
      <v-ons-row >
        <v-ons-col>代理类型：</v-ons-col>
        <v-ons-col>
          <span v-if="userinfo.agencyType == 1">超级管理员</span>
          <span v-if="userinfo.agencyType == 2">超级代理</span>
          <span v-if="userinfo.agencyType == 3">普通代理</span>
        </v-ons-col>
      </v-ons-row>
      <v-ons-row v-if="userinfo.agencyType < 3">
        <v-ons-col>玩家数量：</v-ons-col>
        <v-ons-col>{{personalInfo.userCount}}</v-ons-col>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col>代理数量：</v-ons-col>
        <v-ons-col>{{personalInfo.agencyCount}}</v-ons-col>
      </v-ons-row>
      <v-ons-row  v-if="userinfo.agencyType > 1">
        <v-ons-col>代理余额：</v-ons-col>
        <v-ons-col>{{userinfo.agencyBalance}}</v-ons-col>
      </v-ons-row>
      <v-ons-row  v-if="userinfo.agencyType == 1">
        <v-ons-col>在线玩家数量：</v-ons-col>
        <v-ons-col>{{personalInfo.onlineUserCount}}</v-ons-col>
      </v-ons-row>
      <v-ons-row v-if="userinfo.agencyType < 3">
        <v-ons-col>平台充值总收入：</v-ons-col>
        <v-ons-col>{{personalInfo.totalIncome}}</v-ons-col>
      </v-ons-row>
      <v-ons-row v-if="userinfo.agencyType < 3">
      <v-ons-col>出售金币数量：</v-ons-col>
      <v-ons-col>{{personalInfo.coinSum}}</v-ons-col>
    </v-ons-row>
      <v-ons-row v-if="userinfo.agencyType < 3">
        <v-ons-col>出售房卡数量：</v-ons-col>
        <v-ons-col>{{personalInfo.roomCardSum}}</v-ons-col>
      </v-ons-row>
      <v-ons-row v-if="userinfo.agencyType > 1">
        <v-ons-col>金币余额数量：</v-ons-col>
        <v-ons-col>{{userinfo.coin}}</v-ons-col>
      </v-ons-row>
      <v-ons-row v-if="userinfo.agencyType > 1">
        <v-ons-col>房卡余额数量：</v-ons-col>
        <v-ons-col>{{userinfo.roomCard}}</v-ons-col>
      </v-ons-row>
    </v-ons-card>
    <v-ons-card class="app_list_row">
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
  import {getInfo} from '@/api/login'

  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        personalInfo: {},
        userinfo: {}
      }
    },
    created() {
      this.getMyAgency();
      this.getPersonalInfo();
      this.getInfo();
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
      },
      getInfo() {
        getInfo('').then(response => {
          this.userinfo = response.data.entity;
        })
      }
    }
  }
</script>

<style scoped>
  .app_list_row ons-col{
    padding: 5px;
  }
</style>
