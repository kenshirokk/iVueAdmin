<template>
  <v-ons-page>
    <app-head title="商城管理"></app-head>
    <v-ons-list>
      <v-ons-list-item v-for="td in tableData" :key="td.id">
        <v-ons-row>
          <v-ons-col width="75%" class="app_list_row">
            <v-ons-row vertical-align="center" >
              <v-ons-col width="40%">商品名称：</v-ons-col>
              <v-ons-col width="60%">{{td.itemName}}</v-ons-col>
            </v-ons-row>
            <v-ons-row vertical-align="center">
              <v-ons-col width="40%">商品类型：</v-ons-col>
              <v-ons-col width="60%">{{td.itemType}}</v-ons-col>
            </v-ons-row>
            <v-ons-row vertical-align="center">
              <v-ons-col width="40%">商品价格：</v-ons-col>
              <v-ons-col width="60%">{{td.price}}</v-ons-col>
            </v-ons-row>
            <v-ons-row vertical-align="center">
              <v-ons-col width="40%">商品数量：</v-ons-col>
              <v-ons-col width="60%">{{td.goodsNum}}</v-ons-col>
            </v-ons-row>
          </v-ons-col>
          <v-ons-col width="25%" height="100%">
            <v-ons-row class="btn_row " style="margin-top: 30%">
              <v-ons-col  style="text-align: right">
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
  import {getList} from '@/api/mall'
  import P2 from './p2'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    name: "p1",
    data() {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 10
      }
    },
    computed: {
      ...mapState('mall', ['pageStack'])
    },
    created() {
      this.getList()
      Bus.$on('refreshMallData', (data) => {
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
      ...mapMutations('mall', ['push', 'prepareUpdate']),
      getList() {
        getList(this.pageNum, this.pageSize).then(response => {
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
