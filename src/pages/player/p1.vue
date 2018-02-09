<template>
  <v-ons-page :infinite-scroll="getNext">
    <app-head title="玩家管理">
      <v-ons-toolbar-button @click="showSearch">
        <v-ons-icon icon="ion-search"></v-ons-icon>
      </v-ons-toolbar-button>
      <app-search :temp="this.searchTemp"
                  :list="[{placeholder:'请输入玩家ID',name:'userId'},{placeholder:'请输入玩家昵称',name:'nickname'},{placeholder:'请输入推荐人ID',name:'spreaderID'}]"
                  :visible.sync="showSearchVisible"
                  @change-params="changeTemp"></app-search>
    </app-head>
    <v-ons-list>
      <v-ons-list-item v-for="td in tableData" :key="td.userID">

        <v-ons-row vertical-align="center" class="app_list_row">
          <v-ons-col width="30%">
            <img :src="td.customFace" style="width: 100px; height: 100px;" class="avatar_80">
          </v-ons-col>
          <v-ons-col width="70%" class="inner">
            <v-ons-row>
              <v-ons-col class="w40">玩家ID</v-ons-col>
              <v-ons-col class="w60">{{td.userID}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">玩家昵称</v-ons-col>
              <v-ons-col class="w60">{{td.nickName}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">推荐人ID</v-ons-col>
              <v-ons-col class="w60">{{td.spreaderID}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">推荐人昵称</v-ons-col>
              <v-ons-col class="w60">{{td.agencyNickname}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">金币</v-ons-col>
              <v-ons-col class="w60">{{td.score}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">房卡</v-ons-col>
              <v-ons-col class="w60">{{td.insureScore}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">注册时间</v-ons-col>
              <v-ons-col class="w60">{{$format.dateFormat(td.registerDate)}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col class="w40">最后登录时间</v-ons-col>
              <v-ons-col class="w60">{{$format.dateFormat(td.lastLogonDate)}}</v-ons-col>
            </v-ons-row>
          </v-ons-col>
        </v-ons-row>
        <v-ons-row class="btn_row">
          <v-ons-col>
            <v-ons-button modifier="outline" @click="openCoin(td)" class="btn">充值金币</v-ons-button>
          </v-ons-col>
          <v-ons-col>
            <v-ons-button modifier="outline" @click="openRoomCard(td)" class="btn">充值房卡</v-ons-button>
          </v-ons-col>
          <v-ons-col>
            <v-ons-button modifier="outline" @click="openSpreader(td)" class="btn" v-if="role == 1">修改推荐人</v-ons-button>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-progress-bar indeterminate v-show="showProfressBar"></v-ons-progress-bar>

    <v-ons-alert-dialog cancelable :visible.sync="coinVisible" title="输入充值金币数量"
                        :footer="{确定: updateCoin}">
      <v-ons-input placeholder="充值金币数量" v-model.number="coin" modifier="underbar" type="number"></v-ons-input>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog cancelable :visible.sync="roomCardVisible" title="输入充值房卡数量"
                        :footer="{确定: updateRoomCard}">
      <v-ons-input placeholder="充值房卡数量" v-model.number="roomCard" modifier="underbar" type="number"></v-ons-input>
    </v-ons-alert-dialog>
    <v-ons-alert-dialog cancelable :visible.sync="spreaderVisible" title="输入推荐人ID"
                        :footer="{确定: updateSpreader}">
      <v-ons-input placeholder="推荐人ID" v-model.number="spreader" modifier="underbar" type="number"></v-ons-input>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
  import {getList, updateRoomCard, updateCoin, updateSpreader} from '@/api/accountsInfo'
  import {mapGetters} from 'vuex'

  export default {
    name: "p1",
    data() {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        showProfressBar: true,
        coinVisible: false,
        roomCardVisible: false,
        spreaderVisible: false,
        showSearchVisible: false,
        searchTemp:{
          userId: '',
          spreaderID: '',
          nickname: ''
        },
        tempUserId: '',
        coin: '',
        roomCard: '',
        spreader: '',
        role: ''
      }
    },
    created() {
      this.showProfressBar = true
      this.getList()
      this.role = this.getLoginUser().agencyType;
    },
    watch: {
      coinVisible: function (newv, oldv) {
        if (newv === false) {
          this.coin = ''
        }
      }
    },
    methods: {
      ...mapGetters(['getLoginUser']),
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
      getList() {
        getList(this.pageNum, this.pageSize, this.searchTemp.userId, this.searchTemp.spreaderID, this.searchTemp.nickname).then(response => {
          this.tableData = response.data.list
          this.showProfressBar = false
        })
      },
      getNext(done) {
        this.showProfressBar = true
        getList(++this.pageNum, this.pageSize, this.searchTemp.userId, this.searchTemp.spreaderID, this.searchTemp.nickname).then(response => {
          this.tableData = this.tableData.concat(response.data.list)
          this.showProfressBar = false
          done()
        })
      },
      openCoin(data) {
        this.coinVisible = true
        this.tempUserId = data.userID
      },
      openRoomCard(data) {
        this.roomCardVisible = true
        this.tempUserId = data.userID
      },
      openSpreader(data) {
        this.spreaderVisible = true
        this.tempUserId = data.userID
      },
      updateCoin() {
        if (!Number.isInteger(Number(this.coin))) {
          this.$ons.notification.toast("金币输入有误", {timeout: 1000})
          return
        }
        let params = {userId: this.tempUserId, quantity: this.coin}
        updateCoin(params).then(() => {

          for (let u of this.tableData) {
            if (u.userID === this.tempUserId) {
              u.score += parseInt(this.coin)
              break
            }
          }

          this.$ons.notification.toast("充值成功", {timeout: 2000})
          this.coinVisible = false
        })
      },
      updateRoomCard() {
        if (!Number.isInteger(Number(this.roomCard))) {
          this.$ons.notification.toast("房卡输入有误", {timeout: 1000})
          return
        }
        let params = {userId: this.tempUserId, quantity: this.roomCard}
        updateRoomCard(params).then(() => {
          for (let u of this.tableData) {
            if (u.userID === this.tempUserId) {
              u.insureScore += parseInt(this.roomCard)
              break
            }
          }

          this.$ons.notification.toast("充值成功", {timeout: 2000})
          this.roomCardVisible = false
        })
      },
      updateSpreader() {
        if (!Number.isInteger(Number(this.spreader))) {
          this.$ons.notification.toast("推荐人ID输入有误", {timeout: 1000})
          return
        }
        let params = {userId: this.tempUserId, spreaderID: this.spreader}
        updateSpreader(params).then(() => {
          for (let u of this.tableData) {
            if (u.userID === this.tempUserId) {
              u.spreaderID = parseInt(this.spreader)
              break
            }
          }

          this.$ons.notification.toast("修改成功", {timeout: 2000})
          this.spreaderVisible = false
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
</style>
