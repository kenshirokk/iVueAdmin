<template>
  <v-ons-page>
    <app-head title="提现申请"></app-head>
    <div >
      <div>
        <form ref="dataForm">
          <v-ons-list>
            <v-ons-list-item >
              <span style="color: tomato;font-size: 16px;font-weight: bold">{{balance}}</span>（元）
            </v-ons-list-item>
            <v-ons-list-item >
              <v-ons-select v-model="temp.money" style="width: 100%;">
                <option v-for="item in options" :value="item.value">
                  {{ item.value }}
                </option>
              </v-ons-select>
            </v-ons-list-item>
            <v-ons-list-item >
              <v-ons-input  placeholder="请输入微信号"  v-model="temp.weixin"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item >
              <v-ons-input  placeholder="请确认支付宝帐号"  v-model="temp.alipay"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-input placeholder="请输入银行卡号" v-model="temp.bankno"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button modifier="large" style="margin: 6px 0" @click="apply">保存</v-ons-button>
            </v-ons-list-item>
          </v-ons-list>
        </form>

      </div>
    </div>
    <v-ons-modal :visible="modalVisible" >
      <p style="text-align: center">
        <v-ons-icon icon="fa-spinner" spin  size="32px"></v-ons-icon>
        <br/>
        <br/>
        <span style="font-size: 14px;">加载中...</span>
      </p>
    </v-ons-modal>
  </v-ons-page>

</template>

<script>
  import {getInfo} from '@/api/login'
  import { save } from '@/api/enchashment'
  export default {
    name: "draw-apply",
    data(){
      return{
        modalVisible: false,
        balance: 0,
        options: [
          {
            value: 200
          },
          {
            value: 500
          },
          {
            value: 1000
          },
          {
            value: 2000
          }
        ],
        temp: {
          money:200,
          weixin:'',
          alipay:'',
          bankno:''
        },
      }
    },
    created() {
      this.getInfo();
    },
    methods:{
      validateAccount() {
        if(!this.temp.weixin && !this.temp.alipay  && !this.temp.bankno  ){
          this.$ons.notification.toast("微信号|支付宝|银行卡必须填写一个", {timeout: 2000})
          return false;
        }else{
          return true;
        }

      },
      validateMoney() {
        if (/^[1-9]\d*$/.test(this.temp.money) === false) {
          this.$ons.notification.toast("金额必须是正整数", {timeout: 2000})
          return false;
        }else if(this.temp.money > this.balance){
          this.$ons.notification.toast("超出余额", {timeout: 2000})
          return false;
        }else{
          return true;
        }
      },
      apply(){
        this.modalVisible = true;
        if (this.validateMoney() && this.validateAccount()) {
          var params = {money:this.temp.money,weixin:this.temp.weixin,alipay:this.temp.alipay,bankno:this.temp.bankno}
          save(params).then(() => {
            this.$ons.notification.toast("申请成功", {timeout: 2000})
            this.temp.money = '';
            this.temp.weixin = '';
            this.temp.alipay = '';
            this.temp.bankno = '';
            this.modalVisible = false;
            this.getInfo();
          }).catch(() => {
            this.modalVisible = false;
          })
        }else{
          this.modalVisible = false;
        }
      },
      showUserAavatar() {
        this.showUserAvatar = true;
      },
      getInfo() {
        getInfo('').then(response => {
          this.balance = response.data.entity.agencyBalance;
        })
      }
    }
  }
</script>

<style scoped>

</style>
