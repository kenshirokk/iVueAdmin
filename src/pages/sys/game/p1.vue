<template>
  <v-ons-page>
    <app-head title="游戏设置"></app-head>
    <v-ons-list>
      <v-ons-list-item v-for="td in tableData" :key="td.id">
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">参数名称</v-ons-col>
          <v-ons-col width="60%">{{td.paramName}}</v-ons-col>
        </v-ons-row>
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">参数描述</v-ons-col>
          <v-ons-col width="60%">{{td.paramDesc}}</v-ons-col>
        </v-ons-row>
        <v-ons-row vertical-align="center">
          <v-ons-col width="40%">参数值</v-ons-col>
          <v-ons-col width="60%">{{td.paramValue}}</v-ons-col>
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
  import {getList} from '@/api/gameConfig'
  import P2 from './p2'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    name: "p1",
    data() {
      return {
        tableData: [],
      }
    },
    computed: {
      ...mapState('sysGame', ['pageStack'])
    },
    created() {
      this.getList()
    },
    methods: {
      ...mapMutations('sysGame', ['push', 'prepareUpdate']),
      getList() {
        getList().then(response => {
          this.tableData = response.data.list
        })
      },
      update(data) {
        this.prepareUpdate(data)
        this.push(P2)
      }
    }
  }
</script>

<style scoped>

</style>
