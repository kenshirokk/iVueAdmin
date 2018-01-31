<template>
  <v-ons-page :infinite-scroll="getNext">
    <app-head title="我的代理">
      <v-ons-toolbar-button @click="showSearch">
        <v-ons-icon icon="ion-search"></v-ons-icon>
      </v-ons-toolbar-button>
      <app-search :temp="this.searchTemp"
                  :list="[{placeholder:'请输入代理ID',name:'agencyId'},{placeholder:'请输入代理昵称',name:'nickname'},{placeholder:'请输入上级代理ID',name:'parentId'}]"
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
              <v-ons-col class="w60">{{td.nickname}}</v-ons-col>
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
              <v-ons-col class="w40">手机号：</v-ons-col>
              <v-ons-col class="w60">{{td.phone}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">上级代理ID：</v-ons-col>
              <v-ons-col class="w60">{{td.parentId}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">上级代理昵称：</v-ons-col>
              <v-ons-col class="w60">{{td.parentNickname}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">金币余额：</v-ons-col>
              <v-ons-col class="w60">{{td.coin}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">房卡余额：</v-ons-col>
              <v-ons-col class="w60">{{td.roomCard}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">代理余额：</v-ons-col>
              <v-ons-col class="w60">{{td.agencyBalance}}</v-ons-col>
            </v-ons-row>
          </v-ons-col>
        </v-ons-row>
        <v-ons-row class="btn_row">
          <v-ons-col >
            <v-ons-button modifier="outline" @click="openGolds(td)" class="btn">充值金币</v-ons-button>
          </v-ons-col>
          <v-ons-col>
            <v-ons-button modifier="outline" @click="openRoomCard(td)" class="btn">充值房卡</v-ons-button>
          </v-ons-col>
          <v-ons-col >
            <v-ons-button modifier="outline" @click="openPassword(td)" class="btn">修改密码</v-ons-button>
          </v-ons-col>
        </v-ons-row>
        <v-ons-row class="btn_row">
          <v-ons-col>
            <v-ons-button modifier="outline" v-if="td.disable == 0" @click="disabled(td)" class="btn">禁用</v-ons-button>
            <v-ons-button modifier="outline"  v-else @click="disabled(td)" class="btn">启用</v-ons-button>
          </v-ons-col>
          <v-ons-col >
            <v-ons-button modifier="outline" @click="del(td)" class="btn red_btn">删除</v-ons-button>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-progress-bar indeterminate v-show="showProfressBar"></v-ons-progress-bar>

    <v-ons-alert-dialog cancelable :visible.sync="coinVisible" title="输入充值金币数量"
                        :footer="{确定: updateCoin}">
      <v-ons-input placeholder="充值金币数量" v-model="temp.coin" modifier="underbar" type="number"></v-ons-input>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog cancelable :visible.sync="roomCardVisible" title="输入充值房卡数量"
                        :footer="{确定: updateRoomCard}">
      <v-ons-input placeholder="充值房卡数量" v-model="temp.roomCard" modifier="underbar" type="number"></v-ons-input>
    </v-ons-alert-dialog>
    <v-ons-alert-dialog cancelable :visible.sync="passwordVisible" title="修改密码"
                        :footer="{确定: updatePwd}">
      <v-ons-input placeholder="请输入密码" v-model="temp.password" modifier="underbar" type="password"></v-ons-input>
      <v-ons-input placeholder="请输入确认密码" v-model="temp.password2" modifier="underbar" type="password"></v-ons-input>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
  import { getList,updateRoomCard,updateCoin,updateSpreader,del,disabled,updatePwd} from '@/api/agency'
  import Vue from 'vue'
  import moment from 'moment/moment'
  export default {
    name: 'manage',
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        loading: false,
        showSearchVisible: false,
        searchTemp:{
          agencyId: '',
          parentId: '',
          nickname: ''
        },
        userAvatar: '',
        showUserAvatar:false,
        coinVisible: false,
        roomCardVisible: false,
        passwordVisible: false,
        showProfressBar: false,
        temp: {
          id:'',
          password:'',
          password2:'',
          coin:'',
          roomCard:''
        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          password2: [
            { required: true, message: '请输入确认密码', trigger: 'change' },
            { validator: this.validatePassword, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
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
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
      },
      showUserAavatar(row) {
        this.userAvatar = row.avatar;
        this.showUserAvatar = true;
      },
      getList(back) {
        this.loading = true;
        getList(this.pageNum, this.pageSize,this.searchTemp.agencyId,this.searchTemp.parentId,this.searchTemp.nickname).then(response => {
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
      openGolds(row) {
        this.temp.id = row.id;
        this.coinVisible = true;
      },
      updateCoin(){
        var params = {agencyId:this.temp.id ,quantity: this.temp.coin }
        updateCoin(params).then(() => {
          for (let u of this.tableData) {
            if (u.id === this.temp.id) {
              u.coin = u.coin?(parseInt(u.coin)+parseInt(this.temp.coin)) :this.temp.coin
              break
            }
          }
          this.$ons.notification.toast("充值成功", {timeout: 2000})
          this.coinVisible = false
        })
      },
      openRoomCard(row){
        this.temp.id = row.id;
        this.roomCardVisible = true;
      },
      updateRoomCard() {
        var params = {agencyId:this.temp.id ,quantity: this.temp.roomCard}
        updateRoomCard(params).then(() => {
          for (let u of this.tableData) {
            if (u.id === this.temp.id) {
              u.roomCard = u.roomCard?(parseInt(u.roomCard)+parseInt(this.temp.roomCard)) :this.temp.roomCard
              break
            }
          }
          this.$ons.notification.toast("充值成功", {timeout: 2000})
          this.roomCardVisible = false
        })
      },
      disabled(row) {
        var params = {agencyId:row.id}
        if(row.isLoading){
          row.isLoading = true;
        }else{
          Vue.set(row,'isLoading',true);
        }
        disabled(params).then(() => {
          row.disable = row.disable == 0 ? 666 : 0;
          row.isLoading = false;
        })
      },
      del(row) {
        this.$ons.notification.confirm('确认删除吗?',{
          buttonLabels: ['取消','确定'],
          title:'提示'
        }).then((btnId) => {
          if(btnId == 1){
            var params = {agencyId:row.id}
            del(params).then(response => {
              this.getList();
              this.$ons.notification.toast("删除成功", {timeout: 2000})
            })
          }
        })
      },
      openPassword(row){
        this.passwordVisible = true;
        try{
          this.temp.password = ''
          this.temp.password2 = '';
        }catch (e){}
        this.temp.id = row.id;
      },
      validatePassword() {
        if(this.temp.password == this.temp.password2){
          return true;
        }else{
          this.$ons.notification.toast("两次密码不一致", {timeout: 2000})
          return false;
        }
      },
      updatePwd(){
        if (this.validatePassword()) {
          var params = {agencyId:this.temp.id,password:this.temp.password}
          this.passwordVisible = false;
          this.$ons.notification.toast("修改成功", {timeout: 2000})
        }
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
    margin: 3px;
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
