<template>
  <v-ons-page :infinite-scroll="getNext">
    <app-head title="系统公告"></app-head>
    <v-ons-list>
      <v-ons-list-item v-for="td in tableData" :key="td.id">
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">公告标题</v-ons-col>
          <v-ons-col width="60%">{{td.title}}</v-ons-col>
        </v-ons-row>
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">公告内容</v-ons-col>
          <v-ons-col width="60%">{{td.content}}</v-ons-col>
        </v-ons-row>
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">公告注释</v-ons-col>
          <v-ons-col width="60%">{{td.desc}}</v-ons-col>
        </v-ons-row>
        <v-ons-row>
          <v-ons-col>
            <v-ons-button modifier="large" @click="update(td)">编辑</v-ons-button>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-progress-bar indeterminate v-show="showProfressBar"></v-ons-progress-bar>
  </v-ons-page>
</template>

<script>
  import {getList, update} from '@/api/bulletin'
  import P2 from './p2'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    name: "p1",
    data() {
      return {
        tableData: [],
        showProfressBar: true,
        pageNum: 1,
        pageSize: 10
      }
    },
    computed: {
      ...mapState('sysMessage', ['pageStack'])
    },
    created() {
      this.showProfressBar = true
      this.getList()
    },
    methods: {
      getList() {
        getList(this.pageNum, this.pageSize).then(response => {
          this.tableData = response.data.list
          this.showProfressBar = false
        })
      },
      getNext(done) {
        this.showProfressBar = true
        getList(++this.pageNum, this.pageSize).then(response => {
          this.tableData = this.tableData.concat(response.data.list)
          this.showProfressBar = false
          done()
        })
      }
    }
  }
</script>

<style scoped>

</style>
