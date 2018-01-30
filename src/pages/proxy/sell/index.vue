<template>
    <v-ons-page :infinite-scroll="next">
      <app-head title="出售记录">
        <v-ons-toolbar-button @click="showSearch">
          <v-ons-icon icon="ion-search"></v-ons-icon>
        </v-ons-toolbar-button>
        <app-search :temp="this.searchTemp"
                    :list="[{placeholder:'请输入代理ID',name:'agencyId'}]"
                    :visible.sync="showSearchVisible"
                    @change-params="changeTemp"></app-search>
      </app-head>
      <v-ons-pull-hook
      :action="ref"
      @changestate="state = $event.state"
      threshold-height="-1px;"
      >
      <span v-show="state === 'initial'"> 下拉刷新...</span>
      <span v-show="state === 'preaction'"> 松开刷新... </span>
      <v-ons-progress-circular v-show="state === 'action'" indeterminate></v-ons-progress-circular>
      </v-ons-pull-hook>
      <v-ons-list>
        <v-ons-list-item  v-for="item in tableData" :key="item.orderId">
          <table style="width: 100%" class="avatar_table">
            <tr >
              <td rowspan="9">
                <table  cellpadding="0" cellspacing="0" border="1">
                 <tr>
                   <td> 玩家头像</td>
                 </tr>
                  <tr>
                    <td> <img :src="item.userImage" class="avatar_80" /></td>
                  </tr>
                  <tr>
                    <td>代理头像</td>
                  </tr>
                  <tr>
                    <td> <img :src="item.agencyImage" class="avatar_80" /></td>
                  </tr>
                </table>
              </td>
              <td>订单ID：</td>
              <td>{{item.orderId}}</td>
            </tr>
            <tr>
              <td>玩家ID：</td>
              <td>{{item.userId}}</td>
            </tr>
            <tr>
              <td>玩家昵称：</td>
              <td>{{item.userNickname}}</td>
            </tr>
            <tr>
              <td>推荐人ID：</td>
              <td>{{item.agencyId}}</td>
            </tr>
            <tr>
              <td>推荐人昵称：</td>
              <td>{{item.agencyNickname}}</td>
            </tr>
            <tr>
              <td>充值类型：</td>
              <td>{{item.getType}}</td>
            </tr>
            <tr>
              <td>充值数量：</td>
              <td>{{item.getNums}}</td>
            </tr>
            <tr>
              <td>充值金额：</td>
              <td>{{item.costMoney}}</td>
            </tr>
            <tr>
              <td>充值时间：</td>
              <td>{{$format.dateFormat(item.orderDatetime)}}</td>
            </tr>
          </table>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
</template>

<script>
  import { getSellRecordVO} from '@/api/report'
  export default {
    name: 'sell',
    data() {
      return {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        tableData: [],
        loading: false,
        searchTemp:{
          agencyId: '',
        } ,
        userAvatar: '',
        showUserAvatar:false,
        state: 'initial',
        showSearchVisible: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      showUserAavatar(avatar) {
        this.userAvatar = avatar;
        this.showUserAvatar = true;
      },
      getList(done) {
        this.loading = true;
        getSellRecordVO(this.pageNum, this.pageSize,this.searchTemp.agencyId).then(response => {
          this.loading = false;
          this.tableData = this.pageNum == 1 ? response.data.list:this.tableData.concat(response.data.list)
          this.total = response.data.total
          if(done){
            done()
          }
        })
      },
      ref(done){
        var oldPageNum = this.pageNum;
        var oldPageSize = this.pageSize;
        this.pageSize = this.pageNum * this.pageSize;
        this.pageNum = 1;
        this.getList(() => {
          this.pageNum = oldPageNum;
          this.pageSize = oldPageSize;
          done();
        });
      },
      next(){
        this.pageNum = this.pageNum + 1;
        this.getList();
      },
      showSearch(){
        this.showSearchVisible = true;
      },
      changeTemp(temp){
        this.pageNum = 1;
        this.pageSize = 5;
        this.searchTemp = temp
        this.getList();
        this.showSearchVisible = false;
      }
    }
  }
</script>

<style scoped>
.avatar_table tr td{
  padding: 5px 5px;
}
</style>
