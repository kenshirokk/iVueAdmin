<template>
  <v-ons-page :infinite-scroll="getNext">
    <app-head title="流水查询详情">
      <v-ons-toolbar-button @click="showSearch">
        <v-ons-icon icon="ion-search"></v-ons-icon>
      </v-ons-toolbar-button>
      <app-search :temp="this.searchTemp"
                  :list="[{placeholder:'请输入玩家ID',name:'userId'}]"
                  :visible.sync="showSearchVisible"
                  @change-params="changeTemp"></app-search>
    </app-head>
    <v-ons-list>
      <v-ons-list-item v-for="td in tableData" :key="td.id">
        <v-ons-row>
          <v-ons-col width="75%" class="app_list_row">
            <v-ons-row vertical-align="center" >
              <v-ons-col width="40%">充值玩家ID：</v-ons-col>
              <v-ons-col width="60%">{{td.userId}}</v-ons-col>
            </v-ons-row>
            <v-ons-row vertical-align="center">
              <v-ons-col width="40%">昵称：</v-ons-col>
              <v-ons-col width="60%">{{td.userNickname}}</v-ons-col>
            </v-ons-row>
            <v-ons-row vertical-align="center">
              <v-ons-col width="40%">充值金额：</v-ons-col>
              <v-ons-col width="60%">{{td.costMoney}}</v-ons-col>
            </v-ons-row>
            <v-ons-row vertical-align="center">
              <v-ons-col width="40%">充值时间：</v-ons-col>
              <v-ons-col width="60%">{{$format.dateFormat(td.orderDatetime)}}</v-ons-col>
            </v-ons-row>
          </v-ons-col>
        </v-ons-row>

      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import { getMoneyFlowVODetail} from '@/api/report'

  export default {
    name: "account-detail",
    props: ['year','month'],
    data() {
      return {
        tableData: [],
        loading: false,
        pageNum: 1,
        pageSize: 10,
        showSearchVisible: false,
        searchTemp: {
        userId:''
      }

      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(back) {
        this.loading = true;
        getMoneyFlowVODetail(this.pageNum,this.pageSize,this.year,this.month,this.searchTemp.userId).then(response => {
          this.loading = false;
          this.tableData = this.pageNum == 1 ? response.data.list:this.tableData.concat(response.data.list)
          this.total = response.data.total
          if(back){
            back();
          }
        })
      },
      getNext(done) {
        this.pageNum = this.pageNum + 1;
        this.getList(() => {
          this.showProfressBar = false
          done()
        })
      },
      changeTemp(temp){
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchTemp = temp
        this.getList();
        this.showSearchVisible = false;
      },
      showSearch(){
        this.showSearchVisible = true;
      },
    }
  }
</script>

<style scoped>

</style>
