<template>
  <v-ons-page>
    <app-head title="游戏设置"></app-head>
    <v-ons-list>
      <v-ons-list-item v-for="td in tableData" :key="td.id">
        <v-ons-row>
          <v-ons-col width="75%" class="app_list_row">
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
          </v-ons-col>
          <v-ons-col width="25%" height="100%">
            <v-ons-row class="btn_row " style="margin-top: 30%">
              <v-ons-col>
                <v-ons-button modifier="outline" @click="update(td)" class="btn">修改</v-ons-button>
              </v-ons-col>
            </v-ons-row>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import Bus from '@/bus'
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
      Bus.$on('refreshSysGameData', (data) => {
        for (let d of this.tableData) {
          if (d.id === data.id) {
            let index = this.tableData.indexOf(d)
            this.tableData.splice(index, 1, data)
            break
          }
        }
      })
    },
    methods: {
      ...mapMutations('sysGame', ['push', 'prepareUpdate']),
      getList() {
        getList().then(response => {
          this.tableData = response.data.list
        })
      },
      update(data) {
        let updateDataTemp = Object.assign({}, data)
        this.prepareUpdate(updateDataTemp)
        this.push(P2)
      }
    }
  }
</script>

<style scoped>
  .btn {
    max-width: 60px;
    font-size: 12px;
  }

  .app_list_row ons-col{
    padding: 5px;
  }
  .btn_row ons-col{
    margin: 5px;
  }
  .btn_row ons-col ons-button{
    width: 100%;
    text-align: center;
  }
</style>
