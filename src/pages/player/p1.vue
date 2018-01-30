<template>
  <v-ons-page>
    <app-head title="玩家管理"></app-head>
    <v-ons-list>
      <v-ons-list-item v-for="td in tableData" :key="td.id">
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">玩家ID</v-ons-col>
          <v-ons-col width="60%">{{td.userID}}</v-ons-col>
        </v-ons-row>
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">玩家昵称</v-ons-col>
          <v-ons-col width="60%">{{td.nickName}}</v-ons-col>
        </v-ons-row>
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">头像</v-ons-col>
          <v-ons-col width="60%">{{td.customFace}}</v-ons-col>
        </v-ons-row>
        <v-ons-row>
          <v-ons-col>
            <v-ons-button modifier="large" @click="update(td)">修改</v-ons-button>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import {getList} from '@/api/accountsInfo'

  export default {
    name: "p1",
    data() {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        userId: '',
        spreaderID: '',
        nickname: '',
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getList(this.pageNum, this.pageSize,this.userId,this.spreaderID,this.nickname).then(response => {
          this.tableData = response.data.list
        })
      }
    }
  }
</script>

<style scoped>

</style>
