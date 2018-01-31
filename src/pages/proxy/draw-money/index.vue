<template>
    <v-ons-page>
      <app-head title="提现审批">
        <v-ons-toolbar-button @click="showSearch">
          <v-ons-icon icon="ion-search"></v-ons-icon>
        </v-ons-toolbar-button>
        <app-search :temp="this.searchTemp"
                    :list="[{placeholder:'请输入代理ID',name:'agencyId'},{placeholder:'请输入代理昵称',name:'nickname'}]"
                    :visible.sync="showSearchVisible"
                    @change-params="changeTemp"></app-search>
      </app-head>
      <v-ons-list>
        <v-ons-list-item v-for="td in tableData" :key="td.id">
          <v-ons-row vertical-align="center" class="app_list_row">
            <v-ons-col width="30%">
              <img :src="td.avatar" style="width: 100px; height: 100px;" class="avatar_80">
            </v-ons-col>
            <v-ons-col width="70%" class="inner">
              <v-ons-row>
                <v-ons-col class="w40">代理ID：</v-ons-col>
                <v-ons-col class="w60">{{td.id}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">代理昵称：</v-ons-col>
                <v-ons-col class="w60">{{td.agencyNickname}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">代理类型：</v-ons-col>
                <v-ons-col class="w60">
                  <span v-if="td.agencyType == 1">超级管理员</span>
                  <span v-if="td.agencyType == 2">超级代理</span>
                  <span v-if="td.agencyType == 3">普通代理</span>
                </v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">提现金额：</v-ons-col>
                <v-ons-col class="w60">{{td.money}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">微信号：</v-ons-col>
                <v-ons-col class="w60">{{td.id}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">代理ID：</v-ons-col>
                <v-ons-col class="w60">{{td.weixin}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">支付宝号：</v-ons-col>
                <v-ons-col class="w60">{{td.alipay}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">银行卡号：</v-ons-col>
                <v-ons-col class="w60">{{td.bankno}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">申请时间：</v-ons-col>
                <v-ons-col class="w60">{{$format.dateFormat(td.createDatetime)}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">审批时间：</v-ons-col>
                <v-ons-col class="w60">{{$format.dateFormat(td.approveDatetime)}}</v-ons-col>
              </v-ons-row>
              <v-ons-row>
                <v-ons-col class="w40">状态：</v-ons-col>
                <v-ons-col class="w60">
                  <span v-if="td.approveStatus == 1"  style="color: #E6A23C;">待审核</span>
                  <span v-if="td.approveStatus == 2"  style="color: #67C23A;">同意</span>
                  <span v-if="td.approveStatus == 3"  style="color: #F56C6C;">拒绝</span>
                </v-ons-col>
              </v-ons-row>
            </v-ons-col>
          </v-ons-row>
          <v-ons-row class="btn_row" v-if="td.approveStatus == 1">
            <v-ons-col>
              <v-ons-button modifier="outline" @click="pass(td)" class="btn">同意</v-ons-button>
            </v-ons-col>
            <v-ons-col>
              <v-ons-button modifier="outline" @click="reject(td)" class="btn">拒绝</v-ons-button>
            </v-ons-col>
          </v-ons-row>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
</template>

<script>
  import { getList,updateStatus} from '@/api/enchashment'
  export default {
    name: 'draw-money',
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        loading: false,
        agencyId: '',
        nickname: '',
        userAvatar: '',
        showUserAvatar:false,
        showSearchVisible: false,
        showProfressBar: false,
        searchTemp:{
          agencyId: '',
          parentId: ''
        },
        temp: {
          id: '',
          status:''
        }


      }
    },
    created() {
      this.getList()
    },
    methods: {
      showUserAavatar(row) {
        this.userAvatar = row.avatar;
        this.showUserAvatar = true;
      },
      showSearch(){
        this.showSearchVisible = true;
      },
      changeTemp(temp){
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchTemp = temp
        this.getList();
        this.showSearchVisible = false;
      },
      getList(back) {
        this.loading = true;
        getList(this.pageNum, this.pageSize,this.agencyId,this.nickname).then(response => {
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
      pass(row) {
        this.$ons.notification.confirm('确认同意这条申请?',{
          buttonLabels: ['取消','确定'],
          title:'提示'
        }).then((btnId) => {
          if(btnId == 1){
            var params = {id:row.id,approveStatus:2}
            updateStatus(params).then(response => {
              this.$ons.notification.toast("审批成功", {timeout: 2000})
              row.approveDatetime = new Date().getTime();
              row.approveStatus = 2;
            })
          }

        })
      },
      reject(row) {
        this.$ons.notification.confirm('确认拒绝这条申请?',{
          buttonLabels: ['取消','确定'],
          title:'提示'
        }).then((btnId) => {
          if(btnId == 1){
            var params = {id:row.id,approveStatus:3}
            updateStatus(params).then(response => {
              this.$ons.notification.toast("拒绝成功", {timeout: 2000})
              row.approveDatetime = new Date().getTime();
              row.approveStatus = 3;
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .w40 {
    width: 40%;
  }

  .w60 {
    width: 60%;
  }

  .btn {
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
  .red_btn{
    border: 1px solid #f56c6c;
    color: #f56c6c;
  }
</style>
